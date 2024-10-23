import { DATA, type ItemType } from './data';


export function Item(props: ItemType) {
  return (
    <div className="item">
      {props.icon}
      {props.url ? <a href={props.url}>{props.name}</a> : ''}
    </div>
  );
}


export function Items(props: { items: ItemType[] }) {
  return (
    <>
      {props.items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </>
  );
}


export default function() {
  return (
    <>
      <Items items={DATA.items} />
      <div className="item"><h2>zig</h2></div>
      <Items items={DATA.zig_items} />
      <div className="item"><h2>zig sokol</h2></div>
      <Items items={DATA.zig_sokol} />
      <div className="item"><h2>VrmEditor</h2></div>
      <Items items={DATA.vrmeditor} />
      <div className="item"><h2>OpenVR</h2></div>
      <Items items={DATA.openvr} />
    </>
  )
}
