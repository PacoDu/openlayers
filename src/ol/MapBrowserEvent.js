/**
 * @module ol/MapBrowserEvent
 */
import MapEvent from './MapEvent.js';

/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/Map~Map} for which events trigger a map browser event.
 */
class MapBrowserEvent extends MapEvent {

  /**
   * @param {string} type Event type.
   * @param {module:ol/PluggableMap} map Map.
   * @param {Event} browserEvent Browser event.
   * @param {boolean=} opt_dragging Is the map currently being dragged?
   * @param {?module:ol/PluggableMap~FrameState=} opt_frameState Frame state.
   */
  constructor(type, map, browserEvent, opt_dragging, opt_frameState) {

    super(type, map, opt_frameState);

    /**
     * The original browser event.
     * @const
     * @type {Event}
     * @api
     */
    this.originalEvent = browserEvent;

    /**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {module:ol/pixel~Pixel}
     * @api
     */
    this.pixel = map.getEventPixel(browserEvent);

    /**
     * The coordinate in view projection corresponding to the original browser event.
     * @type {module:ol/coordinate~Coordinate}
     * @api
     */
    this.coordinate = map.getCoordinateFromPixel(this.pixel);

    /**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */
    this.dragging = opt_dragging !== undefined ? opt_dragging : false;

  }

  /**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @override
   * @api
   */
  preventDefault() {
    super.preventDefault();
    this.originalEvent.preventDefault();
  }

  /**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @override
   * @api
   */
  stopPropagation() {
    super.stopPropagation();
    this.originalEvent.stopPropagation();
  }
}


export default MapBrowserEvent;
