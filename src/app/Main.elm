module Main exposing (main)

import Browser exposing (..)
import Browser.Navigation as Nav
import Url exposing (Url)
import Html exposing(..)

import Auth0 as Auth0
import Ports as Ports
import Session exposing (Session)
import Route exposing (Route)
import Page exposing (Page)

import SavedItemId as Si

-- pages
import Page.ReadLater as ReadLater
import Page.Feeds as Feeds
import Page.FeedItems as FeedItems
import Page.SavedItemList as SavedList
import Page.SavedItemEdit as SavedEdit
import Page.Blank as Blank
import Page.NotFound as NotFound

type Model
  = Redirect Session
  | NotFound Session
  | ReadLater ReadLater.Model
  | Feeds Feeds.Model
  | FeedItems FeedItems.Model
  | SavedList SavedList.Model
  | SavedEdit (Maybe Si.Id) SavedEdit.Model

type Msg
  = Ignored
  | ChangedRoute (Maybe Route)
  | ChangedUrl Url
  | ClickedLink Browser.UrlRequest
  | GotReadLaterMsg ReadLater.Msg
  | GotFeedsMsg Feeds.Msg
  | GotFeedItemsMsg FeedItems.Msg
  | GotSavedListMsg SavedList.Msg
  | GotSavedEditMsg SavedEdit.Msg
  | GotSession Session
  | ChangeSessionAndRoute (Session, Maybe String)

init : Maybe Auth0.LoggedInUser -> Url -> Nav.Key -> (Model, Cmd Msg)
init maybeUser url navKey =
  changeRouteTo (Route.fromUrl url)
    (Redirect <| Session.fromUser navKey maybeUser)
    
view : Model -> Document Msg
view model =
    let
        viewPage page toMsg config =
            let
                { title, body } =
                    Page.view (toSession model) page config
            in
            { title = title
            , body = List.map (Html.map toMsg) body
            }
    in
    case model of
        Redirect _ ->
            viewPage Page.Other (\_ -> Ignored) Blank.view

        NotFound _ ->
            viewPage Page.Other (\_ -> Ignored) NotFound.view
        
        ReadLater readLater ->
            viewPage Page.ReadLater GotReadLaterMsg (ReadLater.view readLater)
        
        Feeds feeds ->
            viewPage Page.Feeds GotFeedsMsg (Feeds.view feeds)
        
        FeedItems feedItems ->
            viewPage Page.FeedItems GotFeedItemsMsg (FeedItems.view feedItems)
        
        SavedList saved ->
            viewPage Page.SavedList GotSavedListMsg (SavedList.view saved)
        
        SavedEdit Nothing saved ->
            viewPage Page.SavedNew GotSavedEditMsg (SavedEdit.view saved)
        
        SavedEdit (Just _) saved ->
            viewPage Page.SavedEdit GotSavedEditMsg (SavedEdit.view saved)

toSession : Model -> Session
toSession model =
  case model of
  Redirect session -> 
    session
  NotFound session -> 
    session
  ReadLater readLater -> 
    ReadLater.toSession readLater
  Feeds feeds ->
    Feeds.toSession feeds
  FeedItems feedItems ->
    FeedItems.toSession feedItems
  SavedList saved ->
    SavedList.toSession saved
  SavedEdit _ saved ->
    SavedEdit.toSession saved

setSession session model =
  case model of
  Redirect _ -> 
    ( Redirect session
    , Route.replaceUrl (Session.navKey session) Route.ReadLater
    )
  NotFound _ -> 
    ( NotFound session, Cmd.none )
  ReadLater readLater -> 
    ReadLater.setSession session readLater
    |> updateWith ReadLater GotReadLaterMsg model
  Feeds feeds ->
    Feeds.setSession session feeds
    |> updateWith Feeds GotFeedsMsg model
  FeedItems feedItems ->
    FeedItems.setSession session feedItems
    |> updateWith FeedItems GotFeedItemsMsg model
  SavedList saved ->
    SavedList.setSession session saved
    |> updateWith SavedList GotSavedListMsg model
  SavedEdit id saved ->
    SavedEdit.setSession session saved
    |> updateWith (SavedEdit id) GotSavedEditMsg model

changeRouteTo : Maybe Route -> Model -> ( Model, Cmd Msg )
changeRouteTo maybeRoute model =
    let
        session =
            toSession model
    in
      case maybeRoute of
        Nothing ->
          ( NotFound session, Cmd.none )
          
        Just Route.Root ->
          ( model, Route.replaceUrl (Session.navKey session) Route.ReadLater )
                 
        Just Route.ReadLater ->
          ReadLater.init session
          |> updateWith ReadLater GotReadLaterMsg model
        
        Just Route.Feeds ->
          Feeds.init session
          |> updateWith Feeds GotFeedsMsg model
        
        Just Route.FeedItems ->
          FeedItems.init session
          |> updateWith FeedItems GotFeedItemsMsg model
        
        Just Route.SavedList ->
          SavedList.init session
          |> updateWith SavedList GotSavedListMsg model
        
        Just (Route.SavedNew title text url) ->
          SavedEdit.initNew session title text url
          |> updateWith (SavedEdit Nothing) GotSavedEditMsg model
        
        Just (Route.SavedEdit id) ->
          SavedEdit.init session id
          |> updateWith (SavedEdit (Just id)) GotSavedEditMsg model
        
        Just Route.LogIn ->
          (model, Ports.logIn { route = Route.toUrl Route.ReadLater })
        
        Just Route.LogOut ->
          let
            navKey = Session.navKey session
            guestSession = Session.guest navKey
            (rlModel, rlCmds) = ReadLater.init guestSession
          in
          (ReadLater rlModel, Cmd.batch [ Ports.logOut (), Cmd.map GotReadLaterMsg rlCmds ])
        
        Just Route.Install ->
          (model, Cmd.batch [ Ports.installWebShare (), Route.replaceUrl (Session.navKey session) Route.ReadLater ])

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( Ignored, _ ) ->
            ( model, Cmd.none )

        ( ClickedLink urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    case url.fragment of
                        Nothing ->
                            -- If we got a link that didn't include a fragment,
                            -- it's from one of those (href "") attributes that
                            -- we have to include to make the RealWorld CSS work.
                            --
                            -- In an application doing path routing instead of
                            -- fragment-based routing, this entire
                            -- `case url.fragment of` expression this comment
                            -- is inside would be unnecessary.
                            ( model, Cmd.none )

                        Just _ ->
                            ( model
                            , Nav.pushUrl (Session.navKey (toSession model)) (Url.toString url)
                            )

                Browser.External href ->
                    ( model
                    , Nav.load href
                    )

        ( ChangedUrl url, _ ) ->
            changeRouteTo (Route.fromUrl url) model

        ( ChangedRoute route, _ ) ->
            changeRouteTo route model
        
        ( GotReadLaterMsg subMsg, ReadLater readLater ) ->
            ReadLater.update subMsg readLater
              |> updateWith ReadLater GotReadLaterMsg model
              
        ( GotFeedsMsg subMsg, Feeds feeds ) ->
            Feeds.update subMsg feeds
              |> updateWith Feeds GotFeedsMsg model
              
        ( GotFeedItemsMsg subMsg, FeedItems feedItems ) ->
            FeedItems.update subMsg feedItems
              |> updateWith FeedItems GotFeedItemsMsg model
        
        ( GotSavedListMsg subMsg, SavedList saved ) ->
            SavedList.update subMsg saved
              |> updateWith SavedList GotSavedListMsg model
        
        ( GotSavedEditMsg subMsg, SavedEdit id saved ) ->
            SavedEdit.update subMsg saved
              |> updateWith (SavedEdit id) GotSavedEditMsg model
              
        ( GotSession session, _ ) ->
            setSession session model
        
        ( ChangeSessionAndRoute (session, redirect), _ ) ->
            let
              (sm,sc) = setSession session model
              cmd = 
                case redirect of
                Just fragment ->
                  Nav.pushUrl (Session.navKey session) fragment
                Nothing ->
                  Cmd.none
            in
            (sm, Cmd.batch [sc, cmd])
            
        ( _, _ ) ->
            -- Disregard messages that arrived for the wrong page.
            ( model, Cmd.none )

updateWith : (subModel -> Model) -> (subMsg -> Msg) -> Model -> (subModel, Cmd subMsg) -> (Model, Cmd Msg )
updateWith toModel toMsg model (subModel, subCmd) =
  ( toModel subModel
  , Cmd.map toMsg subCmd
  )

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    session = toSession model
    modelSubs = 
      case model of
          NotFound _ ->
              Sub.none

          Redirect _ ->
              Sub.none

          ReadLater readLater ->
              Sub.map GotReadLaterMsg (ReadLater.subscriptions readLater)

          Feeds feeds ->
              Sub.map GotFeedsMsg (Feeds.subscriptions feeds)

          FeedItems feedItems ->
              Sub.map GotFeedItemsMsg (FeedItems.subscriptions feedItems)

          SavedList saved ->
              Sub.map GotSavedListMsg (SavedList.subscriptions saved)

          SavedEdit _ saved ->
              Sub.map GotSavedEditMsg (SavedEdit.subscriptions saved)
    in
      Sub.batch
        [ modelSubs
        , Session.changes ChangeSessionAndRoute GotSession session
        ]
      

main =
  Browser.application
    { init = init
    , onUrlChange = ChangedUrl
    , onUrlRequest = ClickedLink
    , subscriptions = subscriptions
    , update = update
    , view = view
    }