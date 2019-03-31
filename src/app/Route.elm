-- pulled from https://github.com/rtfeldman/elm-spa-example/blob/master/src/Route.elm
module Route exposing (Route(..), toUrl, fromUrl, href, replaceUrl, navTo)

import Browser.Navigation as Nav
import Html exposing (Attribute)
import Html.Attributes as Attr
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), (<?>), Parser, oneOf, s, string)
import Url.Parser.Query as Query exposing (string)

import SavedItem
import SavedItemId as Si

type Route
  = Root
  | FeedItems
  | Feeds
  | ReadLater
  | SavedEdit Si.Id
  | SavedNew (Maybe String) (Maybe String) (Maybe String)
  | SavedList
  | LogIn
  | LogOut
  | Install

parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map ReadLater Parser.top
        , Parser.map FeedItems (s "feeditems")
        , Parser.map Feeds (s "feeds")
        , Parser.map ReadLater (s "readlater")
        , Parser.map SavedEdit (s "saved" </> s "edit" </> Si.urlParser)
        , Parser.map SavedNew (s "saved" </> s "new" <?> Query.string "title" <?> Query.string "text" <?> Query.string "url" )
        , Parser.map SavedList (s "saved" </> s "list")
        , Parser.map LogIn (s "login" )
        , Parser.map LogOut (s "logout" )
        , Parser.map Install (s "install" )
        ]



-- PUBLIC HELPERS


href : Route -> Attribute msg
href targetRoute =
    Attr.href (routeToString targetRoute)

replaceUrl : Nav.Key -> Route -> Cmd msg
replaceUrl key route =
    Nav.replaceUrl key (routeToString route)

navTo : Nav.Key -> Route -> Cmd msg
navTo key route =
  let
    url = routeToString route
  in
  Nav.pushUrl key url

toUrl route =
  routeToString route

fromUrl : Url -> Maybe Route
fromUrl url =
    -- The RealWorld spec treats the fragment like a path.
    -- This makes it *literally* the path, so we can proceed
    -- with parsing as if it had been a normal path all along.
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
        |> Parser.parse parser

-- INTERNAL


routeToString : Route -> String
routeToString page =
    let
        (pieces, params) =
            case page of
                Root ->
                    ([], [])

                FeedItems ->
                    ([ "feeditems" ], [])
                    
                Feeds ->
                    ([ "feeds" ], [])
                    
                ReadLater ->
                    ([ "readlater" ], [])
                    
                SavedEdit id ->
                    ([ "saved", "edit", Si.toString id ], [])
                
                SavedNew title text url ->
                    ([ "saved", "new" ], [("title", title), ("text", text), ("url", url)])
                
                SavedList ->
                    ([ "saved", "list" ], [])
                
                LogIn ->
                    ([ "login" ], [])
                
                LogOut ->
                    ([ "logout" ], [])
                
                Install ->
                    ([ "install" ], [])
        query = 
          params
          |> List.filterMap (\(k,v) ->
            case v of
            Just value ->
              Just (k ++ "=" ++ value)
            Nothing -> Nothing
          )
          |> String.join "&"
        queryLength = String.length query
        fragment = "#/" ++ String.join "/" pieces
        queryString =
          case queryLength of
          0 -> ""
          _ -> "?" ++ query
          
    in
    queryString ++ fragment
    