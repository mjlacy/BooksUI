import {ConfigService} from "./config.service";

export function appInitializerFactory(configService: ConfigService): Function {
  return (): Promise<boolean> => {
    return configService.load();
  };
}
