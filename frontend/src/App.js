import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from './util/auth';
import MePage, {loader as meLoader}from './pages/Me';

const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" id='root' element={<RootLayout />} errorElement={<ErrorPage />} loader={tokenLoader}>
      <Route index element={<HomePage />} />
      <Route path='events' element={<EventsRootLayout />}>
        <Route index element={<EventsPage />} loader={eventsLoader} />
        <Route path=':eventId' id='event-detail' loader={eventDetailLoader}>
          <Route index element={<EventDetailPage />} action={deleteEventAction} />
          <Route path='edit' element={<EditEventPage />} action={manipulateEventAction} loader={checkAuthLoader} />
        </Route>
        <Route path='new' element={<NewEventPage />} action={manipulateEventAction} loader={checkAuthLoader} />
      </Route>
      <Route path='me' element={<MePage />} loader={meLoader}/>
      <Route path='logout' action={logoutAction} />
      <Route path='auth' element={<AuthenticationPage />} action={authAction} />
      <Route path='newsletter' loader={checkAuthLoader} element={<NewsletterPage />} action={newsletterAction} />
    </Route>
  ));

function App() {
  return <RouterProvider router={router2} />;
}

export default App;
