import { PageHeading, RouteLink } from '../components/common/PageUI';

export default function NotFound() {
  return <div className="not-found shell page-pad" data-page="not-found"><span className="error-number" aria-hidden="true">404<span>.</span></span><PageHeading number="?" label="A SMALL DETOUR" title={<>This page is<br /><span className="muted-type">off the map.</span></>}>That page isn’t here. Head home or take a look at my writing.</PageHeading><div className="not-found-actions"><RouteLink to="/" button>Back to Home</RouteLink><RouteLink to="/articles">Read my articles</RouteLink></div></div>;
}
