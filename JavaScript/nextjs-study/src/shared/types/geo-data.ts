export interface GeoData {
    type: string;
    metadata: Metadata;
    features: Feature[];
}

export interface Metadata {
    generated: string;
    notice: string;
}

export interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
}

export interface Properties {
    pref: number;
    name: string;
}

export interface Geometry {
    type: string;
    coordinates: number[][][][];
}
