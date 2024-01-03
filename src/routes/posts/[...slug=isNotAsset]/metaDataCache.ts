export type MetaData = {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  icon: string | undefined;
};

export const metaDataMap: { [key: string]: MetaData } = {
  "url": {
    "url": "url",
    "title": "(No title)",
    "description": "",
    "og": undefined,
    "icon": undefined
  }
}
