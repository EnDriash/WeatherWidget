export const getWindDirection = (angle) => {
    const directions = [
        'Północny',
        'Pn.-Wsch.',
        'Wschód  ',
        'Pd.-Wsch.',
        'Południowy',
        'Pd.-Zach.',
        'Zachodni',
        'Pn.-Zach.'
    ];

    return directions[Math.round(angle / 45) % 8];
};

export const getWindStrength = (value) => {
    let result = '';

    switch (true) {
        case value < 0.2:
            result = 'Cisza';
            break;
        case value < 1.5:
            result = 'Powiew';
            break;
        case value < 3.3:
            result = 'Słaby wiatr';
            break;
        case value < 5.4:
            result = 'Łagodny wiatr';
            break;
        case value < 7.9:
            result = 'Umiarkowany wiatr';
            break;
        case value < 10.7:
            result = 'Dość silny wiatr';
            break;
        case value < 13.8:
            result = 'Silny wiatr';
            break;
        case value < 17.1:
            result = 'Bardzo silny wiatr';
            break;
        case value < 20.7:
            result = 'Sztorm';
            break;
        case value < 24.4:
            result = 'Silny sztorm';
            break;
        case value < 28.4:
            result = 'Bardzo silny sztorm';
            break;
        case value < 32.6:
            result = 'Gwałtowny sztorm';
            break;
        case value >= 32.6:
            result = 'Huragan';
            break;
    }

    return result;
};
