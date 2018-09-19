// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    mockData: true,
    sharePointUrl: 'https://kplusv.sharepoint.com/sites/eitrawmaterials',
    tokenServiceUrl: 'http://localhost:8033/token',

    sharePointCredentials: {
        username: 'workflow@kplusv.onmicrosoft.com',
        password: '2pXTEUakVakfx2QE',
        applicationId: 'd8177016-9e69-4548-bc90-35212a357441',
        site: 'https://kplusv.sharepoint.com/sites/eitrawmaterials',
        url: 'https://kplusv.sharepoint.com/'
    },

    clcs: [
        {title: 'CLC North', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCNorth'},
        {title: 'CLC Baltic Sea', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCBalticSea'},
        {title: 'CLC West', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCWest'},
        {title: 'CLC Central', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCCentral'},
        {title: 'CLC East', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCEast'},
        {title: 'CLC South', url: 'https://kplusv.sharepoint.com/sites/eitrawmaterials/CLCSouth'}
    ]
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
