import { Spark } from '../common/Primitives';

export function MessagePoster() {
  return <figure className="message-poster"><div className="poster-top mono"><span>CREATIVE COMMUNICATION</span><span>AV / 01</span></div><p>A clear<br /><span>idea.</span><br />A real<br /><em>connection.</em></p><Spark className="poster-spark" /><figcaption className="mono">THINK IT THROUGH. MAKE IT MATTER.</figcaption></figure>;
}
export function StrategyDiagram() {
  return <figure className="strategy-diagram"><div className="mono">THE WAY I THINK ABOUT MARKETING</div><div className="orbit"><span className="orbit-node people">People</span><span className="orbit-node purpose">Purpose</span><span className="orbit-node message">Message</span><div className="orbit-core">Find the<br /><em>connection.</em></div><Spark className="orbit-spark" /></div><figcaption className="mono">BUSINESS THINKING MEETS CREATIVE CURIOSITY</figcaption></figure>;
}
