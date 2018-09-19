import { TestBed, inject } from '@angular/core/testing';
import { BSGlobalFilter } from './BSGlobalFilter';

describe('BSGlobalFilter', () => {
    let bsgf = new BSGlobalFilter();
    it('should be created', () => {
        expect(bsgf).toBeTruthy();
    });

    it('default filter should return all items', () => {
        let expectedItems = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 3}, {GUID: 4}];
        let actualItems = bsgf.filter(expectedItems);
        expect(expectedItems).toEqual(actualItems);
    });

    it('filter should not only return expected items', () => {
        let tbsgf = new TestBSGlobalFilter();
        let unfilteredItems = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 3}, {GUID: 4}];
        let expectedItems = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 4}];
        let actualItems = tbsgf.filter(unfilteredItems);
        expect(expectedItems).toEqual(actualItems);
    });

    it('and() should return only objects in both arrays', () => {
        let tbsgf = new TestBSGlobalFilter();
        let arrayA = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 4}];
        let arrayB = [{GUID: 0}, {GUID: 2}, {GUID: 3}, {GUID: 4}];
        let expectedItems = [{GUID: 0}, {GUID: 2}, {GUID: 4}];
        let actualItems = bsgf.and(arrayA, arrayB);
        expect(expectedItems).toEqual(actualItems);
    });

    it('or() should return objects form either array', () => {
        let tbsgf = new TestBSGlobalFilter();
        let arrayA = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 4}];
        let arrayB = [{GUID: 0}, {GUID: 2}, {GUID: 4}, {GUID: 5}];
        let expectedItems = [{GUID: 0}, {GUID: 1}, {GUID: 2}, {GUID: 4}, {GUID: 5}];
        let actualItems = bsgf.or(arrayA, arrayB);
        expect(expectedItems).toEqual(actualItems);
    });
});

// NOTE: Since filterChain is protected, we create a subclass to test it's functionality
class TestBSGlobalFilter extends BSGlobalFilter
{
    constructor() {
        super();
        
        // NOTE: Set a simple test filter
        this.filterChain = (data: any[]) => {
            return  data.filter((item) => { return item.GUID != 3});
        };
        
    }
}
