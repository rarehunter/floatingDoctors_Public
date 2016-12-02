// View related metadata
export const PADDING = 64;
export const PANE_SPAN = 14;
export const PANE_LEFT_SPAN = 3;
export const PANEL_CENTER_SPAN = 8;
export const PANEL_RIGHT_SPAN = 3;

export const MAIN_CHART_HEIGHT = 480;

export const MAIN_AXIS_DOT_R = 2;

export const LABEL_DY = 20;
export const LABEL_DY_L = 32;
export const LABEL_DX = 16;

export const SQUARE_SIZE = 4;
export const SQUARE_GUTTER = 1;
export const SQUARE_ACTIVE_SCALE = 1.2;

// DB related metadata
export const DEFAULT_START_TIME = new Date('2014', '12', '01');
export const DEFAULT_END_TIME = new Date('2016', '02', '01');
export const DEFAULT_VISITS = 160; // Should be 160
export const MAX_RECORDS = 100;
export const BAR_SIZE = 4;

export const SquareSize = () => {
    if (window.innerWidth < 1200) {
        return 3;
    } else {
        return 4;
    }
}

export const COMMUNITY_NAME_DICT = {
    'AGUACATE': 'AG',
    'BAHIA AZUL': 'BA1',
    'BAHIA GRANDE': 'BG',
    'BAHIA HONDA': 'BH',
    'BAHIA ROJA': 'BR',
    'BAJO CEDRO': 'BC',
    'BARRANCO ADENTRO': 'BA2',
    'BASTIMENTOS': 'BA3',
    'BOCAS': 'BO1',
    'BOCATORITO': 'BO2',
    'BUENA ESPERANZA': 'BE',
    'CAUCHERO': 'CA',
    'CERRO BRUJO': 'CB',
    'DRAGO': 'DR',
    'ENSENADA': 'EN',
    'KUSAPIN': 'KU',
    'LA SABANA': 'LS1',
    'LA SOLUCION': 'LS2',
    'LOMA ESPINA': 'LE',
    'LOMA PARTIDA': 'LP',
    'NANCE DE RISCO': 'NDR',
    'NORTENO': 'NO',
    'PLAYA VERDE': 'PV',
    'POPA 1': 'PO1',
    'POPA 2': 'PO2',
    'PUEBLO NUEVO': 'PN',
    'PUNTA ALLEGRA': 'PA',
    'PUNTA SIREN': 'PS',
    'QUEBRADA SAL': 'QS',
    'RIO CANA': 'RC',
    'RIO DE OESTE': 'RDO',
    'RIO OESTE': 'RO',
    'SALT CREEK': 'SC1',
    'SAN CRISTOBAL': 'SC2',
    'SAN CRISTOBEL': 'SC3',
    'SHARK HOLE': 'SH',
    'SOLARTE': 'SO',
    'TIERRA OSCURA': 'TO',
    'VALLE ESCONDIDO': 'VE'
};

export const MainChartWidth = () => {
	return (window.innerWidth - PADDING * 2) / PANE_SPAN * PANEL_CENTER_SPAN;
}