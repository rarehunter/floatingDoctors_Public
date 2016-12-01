export const PADDING = 32;
export const PANE_SPAN = 12;
export const PANE_LEFT_SPAN = 2;
export const PANEL_CENTER_SPAN = 8;
export const PANEL_RIGHT_SPAN = 2;

export const MAIN_CHART_HEIGHT = 640;

export const MAIN_AXIS_DOT_R = 2;

export const LABEL_DY = 20;
export const LABEL_DY_L = 32;
export const LABEL_DX = 16;

export const SQUARE_SIZE = 4;
export const SQUARE_GUTTER = 1;
export const SQUARE_ACTIVE_SCALE = 1.2;


export const SquareSize = () => {
	if (window.innerWidth < 1200) {
		return 3;
	} else {
		return 4;
	}
}

export const MainChartWidth = () => {
	return (window.innerWidth - PADDING * 2) / PANE_SPAN * PANEL_CENTER_SPAN;
}