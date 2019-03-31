-- https://auth0.com/blog/creating-your-first-elm-app-part-2/

module Auth0
    exposing
        ( AuthenticationState(..)
        , AuthenticationError
        , AuthenticationResult
        , RawAuthenticationResult
        , Options
        , LoggedInUser
        , UserProfile
        , Token
        , mapResult
        )


type alias LoggedInUser =
    { profile : UserProfile
    , token : Token
    }


type AuthenticationState
    = LoggedOut
    | LoggedIn LoggedInUser


type alias Options =
    { route: String }


type alias UserProfile =
    { email : String
    , email_verified : Bool
    }


type alias Token =
    String


type alias AuthenticationError =
    { name : Maybe String
    , code : Maybe String
    , description : String
    , statusCode : Maybe Int
    }


type alias AuthenticationResult =
    Result AuthenticationError LoggedInUser


type alias RawAuthenticationResult =
    { err : Maybe AuthenticationError
    , ok : Maybe LoggedInUser
    , redirect: Maybe String
    }


mapResult : RawAuthenticationResult -> (AuthenticationResult, Maybe String)
mapResult result =
    case ( result.err, result.ok ) of
        ( Just msg, _ ) ->
            (Err msg, result.redirect)

        ( Nothing, Nothing ) ->
            (Err { name = Nothing, code = Nothing, statusCode = Nothing, description = "No information was received from the authentication provider" }, result.redirect)

        ( Nothing, Just user ) ->
            (Ok user, result.redirect)