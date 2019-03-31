port module Ports exposing (sessionChange, logIn, logOut, installWebShare, showInstallWebShare)

import Auth0

port authorize : Auth0.Options -> Cmd msg
port authResult : (Auth0.RawAuthenticationResult -> msg) -> Sub msg
port redirect : (String -> msg) -> Sub msg
port logout : () -> Cmd msg
port setInstall: (Bool -> msg) -> Sub msg
port install : () -> Cmd msg

sessionChange toMsg =
  authResult (Auth0.mapResult >> toMsg)

logIn options =
  authorize options

logOut _ =
  logout ()

installWebShare () =
  install ()

showInstallWebShare toMsg =
  setInstall toMsg