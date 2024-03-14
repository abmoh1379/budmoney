const typeColorClassName = (type) => {
    switch(type) {
        case 'Housing' : return 'app-expense__type--housing';
        case 'Transportation' : return 'app-expense__type--transportation';
        case 'Health care' : return 'app-expense__type--health-care';
        case 'Grocery' : return 'app-expense__type--grocery';
        case 'Utility' : return 'app-expense__type--utility';
        case 'Entertainment' : return 'app-expense__type--entertainment';
        case 'Product' : return 'app-expense__type--product';
        case 'Service' : return 'app-expense__type--service';
        case 'Others' : return 'app-expense__type--others';
    };
};

export default typeColorClassName;