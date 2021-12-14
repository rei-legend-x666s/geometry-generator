import { Circle, Fill, Stroke, Style } from "ol/style";

const fill = new Fill({
  color: "rgb(255,0,0)",
});
const stroke = new Stroke({
  color: "#ff0000",
  width: 1.25,
});
const point = new Style({
  image: new Circle({
    fill: fill,
    stroke: stroke,
    radius: 5,
  }),
  fill: fill,
  stroke: stroke,
});

const polygon = new Style({
  fill: new Fill({ color: "rgb(255, 0, 0, 0.5)" }),
  stroke,
});

const styles = {
  point,
  polygon,
};

export { styles };
