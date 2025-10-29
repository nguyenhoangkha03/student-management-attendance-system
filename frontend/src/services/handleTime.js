
export function Day(day){
    switch(day){
        case 0:
            return 'Chủ nhật'
        case 1:
            return 'Thứ hai'
        case 2:
            return 'Thứ ba'
        case 3:
            return 'Thứ tư'
        case 4:
            return 'Thứ năm'
        case 5:
            return 'Thứ sáu'
        case 6:
            return 'Thứ bảy'
        default:
            return 'Invalid day'
    }
}

export function Month(month){
    switch(month){
        case 0:
            return 'Tháng 1'
        case 1:
            return 'Tháng 2'
        case 2:
            return 'Tháng 3'
        case 3:
            return 'Tháng 4'
        case 4:
            return 'Tháng 5'
        case 5:
            return 'Tháng 6'
        case 6:
            return 'Tháng 7 '
        case 7:
            return 'Tháng 8'
        case 8:
            return 'Tháng 9'
        case 9:
            return 'Tháng 10'
        case 10:
            return 'Tháng 11'
        case 11:
            return 'Tháng 12'
        default:
            return 'Invalid month'
    }
}

export function HMS(hms){
    hms = hms.toString()
    if(hms.length < 2){
        return '0' + hms
    }
    return hms
}
