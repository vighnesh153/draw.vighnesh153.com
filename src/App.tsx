/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from "react";

import { Canvas } from "./Canvas";

export function App(): JSX.Element {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas />
    </div>
  );
}
