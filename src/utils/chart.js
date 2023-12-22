import Chart from 'chart.js/auto'

export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    greendark: 'rgb(9, 121, 105)',
    greenlight: 'rgb(175, 225, 175)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

export function GetChart(id, config) {
    return new Chart(document.getElementById(id), config)
}

export function colorize(color) {
    return (ctx) => {
        const v = ctx.parsed.y;
        if (v < 0) {
            return CHART_COLORS.red
        }
        return color
    };
}