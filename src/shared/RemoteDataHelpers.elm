module RemoteDataHelpers exposing (AuthWebData(..), mapResult, handleResult, makeGetRequest, makePutRequest, makePatchRequest, makeEmptyPatchRequest, createErrorMessage, viewError)

import Http
import Html exposing (..)

import RemoteData exposing (WebData)

makeRequest url user method expect body =
  { method = method
  , headers = [ Http.header "Authorization" ("Bearer " ++ user.token )]
  , url = url
  , body = body
  , expect = expect
  , timeout = Nothing
  , withCredentials = False
  }
  |> Http.request

makeGetRequest url user decoder =
  makeRequest url user "GET" (Http.expectJson decoder) Http.emptyBody

makePutRequest url user body =
  makeRequest url user "PUT" Http.expectString (Http.jsonBody body)

makePatchRequest url user body =
  makeRequest url user "PATCH" Http.expectString (Http.jsonBody body)

makeEmptyPatchRequest url user =
  makeRequest url user "PATCH" Http.expectString Http.emptyBody

type AuthWebData a
  = WebResponse (WebData a)
  | AuthError

mapResult: AuthWebData a -> (a -> b) -> AuthWebData b
mapResult result transform =
  case result of
    AuthError -> AuthError
    WebResponse response ->
      case response of
        RemoteData.NotAsked ->
          WebResponse RemoteData.NotAsked
        RemoteData.Loading ->
          WebResponse RemoteData.Loading
        RemoteData.Success items ->
          items
          |> transform
          |> RemoteData.Success
          |> WebResponse
        RemoteData.Failure error ->
          WebResponse (RemoteData.Failure error)

handleResult: AuthWebData a -> (WebData a -> Html msg) -> Html msg
handleResult result handleResponse =
  case result of
    AuthError -> text "Not Authorized"
    WebResponse response ->
      handleResponse response

createErrorMessage: Http.Error -> String
createErrorMessage error =
  case error of
    Http.BadUrl message ->
      message
    Http.Timeout ->
      "Server took to long to respond."
    Http.NetworkError ->
      "Can't connect to the internet"
    Http.BadStatus response ->
      response.status.message
    Http.BadPayload message response ->
      message
      
viewError: String -> Html msg
viewError errorMessage =
  let
        errorHeading =
            "Couldn't fetch data at this time."
    in
        div []
            [ h3 [] [ text errorHeading ]
            , text ("Error: " ++ errorMessage)
            ]