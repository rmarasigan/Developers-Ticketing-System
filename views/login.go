package views

import (
	"net/http"

	"github.com/uadmin/uadmin"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	context := map[string]interface{}{}
	session := uadmin.IsAuthenticated(r)

	// Checks if session is not empty and is authenticated.
	if session != nil {
		http.Redirect(w, r, "/ticketing/dashboard/", 303)
		return
	}

	if r.Method == "POST" {
		username := r.FormValue("username")
		password := r.FormValue("password")

		if username == "" {
			context["login_denied"] = true
			context["err_msg"] = "Please input your username."
		}

		if password == "" {
			context["login_denied"] = true
			context["err_msg"] = "Please input your password."
		}

		if username == "" && password == "" {
			context["login_denied"] = true
			context["err_msg"] = "Please input your username and password."
		}

		if username != "" && password != "" {
			user := uadmin.User{}
			uadmin.Get(&user, "username = ?", username)

			// Logs in User using Password and OTP. If there is
			// no OTP, pass an empty string.
			session := user.Login(password, "")

			// Checks if session is not empty and set session cookie.
			if session != nil {
				http.SetCookie(w, &http.Cookie{
					Path:     "/",
					Name:     "session",
					Value:    session.Key,
					SameSite: http.SameSiteStrictMode,
				})

				http.Redirect(w, r, "/ticketing/dashboard/", 303)
				return
			} else {
				context["login_denied"] = true
				context["err_msg"] = "Login denied"
			}
		}
	}

	if context["login_denied"] != "" || context["login_denied"] != nil && context["err_msg"] != "" || context["err_msg"] != nil {
		uadmin.Trail(uadmin.DEBUG, "Error: %v", context["err_msg"])
	} else {
		uadmin.Trail(uadmin.DEBUG, "LOGIN")
	}
	uadmin.RenderHTML(w, r, "./templates/login/login.html", context)
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	session := uadmin.Session{}
	key := uadmin.GetUserFromRequest(r).GetActiveSession().Key
	uadmin.Trail(uadmin.DEBUG, "%v | %v  yahoo", key, session.Key)
	// uadmin.Get(&session, "key = ?", key)
	uadmin.Trail(uadmin.DEBUG, "Session Key Logout: %v", key)
	uadmin.Get(&session, "`key` = ? ", key)
	uadmin.DeleteList(&session, "`key` = ?", key)

	// Expire session cookie on logout
	sessionCookie := &http.Cookie{
		Name:   "session",
		Path:   "/",
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, sessionCookie)
	http.Redirect(w, r, "/login/", 303)
}
