'use client';

import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { GeoData } from '../types/geo-data';

// 地図データの動的取得
const geoJson = (await d3.json('/prefectures.geojson.json')) as GeoData;

const Map = (): JSX.Element => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const width = 400; // 描画サイズ: 幅
            const height = 400; // 描画サイズ: 高さ
            const scale = 1000; // 地図のスケール

            // 地図の投影設定
            const projection = d3
                .geoMercator()
                .center(d3.geoCentroid(geoJson as d3.ExtendedFeatureCollection))
                .translate([width / 2, height / 2])
                .scale(scale);

            // 地図をpathに投影(変換)
            const path = d3.geoPath().projection(projection);

            // SVG要素を追加
            const svg = d3
                .select('#map-container')
                .append('svg')
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('width', '100%')
                .attr('height', '100%');

            // 都道府県の領域データをpathで描画
            svg.selectAll('path')
                .data(geoJson.features)
                .enter()
                .append('path')
                .attr('d', path as unknown as string)
                .attr('stroke', '#dddddd')
                .attr('stroke-width', 0.25)
                .attr('fill', '#2566CC');

            return () => {
                d3.select('#map-container').selectAll('*').remove();
            };
        }
    }, [mounted]);

    if (!mounted) {
        return <></>;
    }

    return <div className="flex h-full w-full justify-center" id="map-container" />;
};

export default Map;
