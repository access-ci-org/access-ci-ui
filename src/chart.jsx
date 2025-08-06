import { useLayoutEffect, useRef } from "react";

import {
  Chart as ChartJS,
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
);

export default function Chart({ type = "bar", data, options }) {
  const chart = useRef(null);
  const canvas = useRef(null);
  useLayoutEffect(() => {
    if (!canvas.current) return;
    if (!chart.current) {
      chart.current = new ChartJS(canvas.current, {
        type,
        data: data,
        options: options,
      });
    } else {
      chart.current.options = options;
      // TODO: Improve handling of existing datasets to enable animation.
      chart.current.data = data;
      chart.current.update();
    }
  }, [type, data, options]);

  return (
    <div className="chart">
      <canvas ref={canvas}></canvas>
    </div>
  );
}
