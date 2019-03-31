module Session exposing(Session, fromUser, guest, toUser, navKey, changes, canInstall)

import Browser.Navigation as Nav
import Auth0 as Auth0
import Ports as Ports

type Session
  = LoggedIn Nav.Key Auth0.LoggedInUser Bool
  | Guest Nav.Key Bool
  | Error Nav.Key Auth0.AuthenticationError Bool

fromUser: Nav.Key -> Maybe Auth0.LoggedInUser -> Session
fromUser key maybeUser =
  case maybeUser of
  Just user -> LoggedIn key user False
  Nothing -> Guest key False

fromLogin: Nav.Key -> Auth0.AuthenticationResult -> Session
fromLogin key result =
  case result of
    Err authError ->
      Error key authError False
    Ok user ->
      LoggedIn key user False

guest: Nav.Key -> Session
guest key =
  Guest key False

toUser session =
  case session of
  LoggedIn key user _ -> Just user
  Guest _ _ -> Nothing
  Error _ _ _ -> Nothing

navKey : Session -> Nav.Key
navKey session =
    case session of
        LoggedIn key _ _->
            key
        Guest key _ ->
          key
        Error key _ _ ->
          key

canInstall session =
  case session of
    LoggedIn _ _ status -> status
    Guest _ status -> status
    Error _ _ status -> status

setInstall session status =
    case session of
      LoggedIn key user _ ->
        LoggedIn key user status
      Guest key _ ->
        Guest key status
      Error key err _ ->
        Error key err status
          
changes : ((Session, Maybe String) -> msg) -> (Session -> msg) -> Session -> Sub msg
changes sessionChangeToMsg sessiontoMsg session =
  let
    key = navKey session
  in
  Sub.batch 
    [ Ports.sessionChange (\(result, redirect ) -> sessionChangeToMsg ((fromLogin key result), redirect))
    , Ports.showInstallWebShare (\result -> sessiontoMsg (setInstall session result))
    ]