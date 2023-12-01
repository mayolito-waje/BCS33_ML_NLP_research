import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type {
  Container,
  Engine,
  RecursivePartial,
  IOptions,
} from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import particleData from '../particlesjs-config.json';

function Wallpaper() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log(container);
    },
    []
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleData as RecursivePartial<IOptions>}
    />
  );
}

export default Wallpaper;
