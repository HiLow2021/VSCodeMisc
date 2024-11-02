'use client';

import { Feature, GeoData } from '@/shared/types/geo-data';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import * as geoJson from '../../../static/prefectures.geo.json';

const data: GeoData = geoJson as GeoData;

export default function Map() {
    const [mounted, setMounted] = useState(false);
    const [state, setState] = useState<boolean[]>([...Array(data.features.length).fill(false)]);

    const selectionColor = '#CC0000';
    const selectionHoverColor = '#FF0000';
    const defaultColor = '#2566CC';
    const defaultHoverColor = '#3588DD';

    const getId = (feature: Feature) => feature.properties.pref - 1;

    const getColor = (feature: Feature, hover?: boolean) => {
        const id = getId(feature);
        const color = state[id] ? (hover ? selectionHoverColor : selectionColor) : hover ? defaultHoverColor : defaultColor;

        return color;
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            const width = 400;
            const height = 400;
            const scale = 1000;

            const projection = d3
                .geoMercator()
                .center(d3.geoCentroid(geoJson as d3.ExtendedFeatureCollection))
                .translate([width / 2, height / 2])
                .scale(scale);

            const path = d3.geoPath().projection(projection);

            const svg = d3
                .select('#map')
                .append('svg')
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('width', '100%')
                .attr('height', '100%');

            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr('d', path as unknown as string)
                .attr('stroke', '#DDDDDD')
                .attr('stroke-width', 0.25)
                .attr('fill', (feature) => {
                    return getColor(feature);
                })
                .on('click', function (_event, feature) {
                    const id = getId(feature);
                    const color = getColor(feature);

                    const newState = [...state];
                    newState[id] = !newState[id];

                    d3.select(this).attr('fill', color);
                    setState(newState);
                })
                .on('mouseover', function (_event, feature) {
                    d3.select(this).attr('fill', getColor(feature, true));
                })
                .on('mouseout', function (_event, feature) {
                    d3.select(this).attr('fill', getColor(feature));
                });

            return () => {
                d3.select('#map').selectAll('*').remove();
            };
        }
    }, [mounted, state]);

    if (!mounted) {
        return <></>;
    }

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Map Page</h1>
                <div className="flex h-full w-full justify-center" id="map" />
                <div className="flex justify-center pb-8">
                    <Button
                        className="w-40"
                        variant="contained"
                        component="span"
                        startIcon={<FileDownloadIcon />}
                        onClick={async () => {
                            const element = document.querySelector('#map');
                            if (element) {
                                const canvas = await html2canvas(element as HTMLElement);
                                const image = canvas.toDataURL('image/png');

                                const link = document.createElement('a');
                                link.href = image;
                                link.download = 'map.png';
                                link.click();
                            }
                        }}
                    >
                        ダウンロード
                    </Button>
                </div>
            </div>
        </main>
    );
}
