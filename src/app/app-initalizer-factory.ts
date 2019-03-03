import {ConfigService} from './config.service';

export function appInitializerFactory(configService: ConfigService): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return configService.load();
  };
}
