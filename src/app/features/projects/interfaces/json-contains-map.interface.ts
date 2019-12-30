export default interface JsonContainsMap {
    property: string; // A string representing the property ('foo') or property trace ('foo.bar.thing')
    expectedValue: any; // The expected value for the property
}
