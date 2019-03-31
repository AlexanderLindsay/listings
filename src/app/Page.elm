module Page exposing (Page(..), view)

import Browser exposing (Document)
import Html exposing (Html, a, button, div, footer, i, img, li, nav, p, span, text, ul, header, main_)
import Html.Attributes exposing (class, classList, href, style, src)
import Html.Events exposing (onClick)

import Auth0 as Auth0
import Route as Route
import Session exposing (Session)

type Page
  = Other
  | ReadLater
  | Feeds
  | FeedItems
  | SavedList
  | SavedEdit
  | SavedNew


viewTitle =
  div 
  [ class "mt2 f2" ]
  [ a [ class "link", Route.href Route.ReadLater ] 
    [ img [ src "/listingBoat.svg", class "header-image" ] []
    , text "Listings"
    ] 
  ]

expansion =
  div [ class "flex-expand"] []

viewNav content =
  nav [ class "db w-100 w-auto-ns tr pointer"]
    [ ul [ class "list pl0" ] content
    ]

navLink attributes content =
  let
    classes = [ class "link f6 fw6" ]
    final =
      List.append attributes classes
  in
  li [ class "dib dim mr3" ]
    [ a final content
    ]

viewHeader page session =
  let
    maybeViewer = Session.toUser session
    canInstall = Session.canInstall session
  in
  header [ class "flex flex-row purple bg-light-blue bb b--black-20 ph1 ph5-ns" ] 
      [ viewTitle
      , expansion
      , viewNav
        ([ (case canInstall of
          True -> Just (navLink [ Route.href Route.Install ] [ text "Install" ])
          False -> Nothing
          )
        , (case maybeViewer of
           Just user ->
             Just (navLink [ Route.href Route.LogOut ] [ text "Log Out" ])
           Nothing ->
             Just (navLink [ Route.href Route.LogIn ] [ text "Log In" ])
          )
        ] |> List.filterMap identity)
      ]

view : Session -> Page -> { title : String, content : Html msg } -> Document msg
view session page { title, content } =
    { title = title
    , body = 
      [ div [ class "avenir bg-light-green min-vh-100" ] 
        [ viewHeader page session
        , div [ class" flex flex-column" ] 
          [ 
          main_ [ class "purple ph1 ph5-ns pv1 pv2-ns" ] [ content ]
          , expansion
          ]
        ] 
      ]
    }