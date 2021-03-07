const { influxOrg, influxBucket, influxToken } = require('../botconfig.json')
const {
  InfluxDB,
  Point,
  DEFAULT_WriteOptions,
} = require('@influxdata/influxdb-client')
const flushBatchSize = DEFAULT_WriteOptions.batchSize
const writeOptions = {
  batchSize: flushBatchSize + 1,
  flushInterval: 0,
  maxBufferLines: 30_000,
  maxRetries: 3,
  maxRetryDelay: 15000,
  minRetryDelay: 1000,
  retryJitter: 1000,
}

const influx = new InfluxDB({ url: 'http://localhost:8080', token: influxToken })

module.exports = {
  logEvent: function (value, statName) {
    const writeApi = influx.getWriteApi(influxOrg, influxBucket, "ms", writeOptions)
    const point = new Point(statName)
      .floatField('value', value)
    writeApi.writePoint(point)
    writeApi
      .close()
      .then(() => { })
      .catch(e => {
        console.error(e)
        console.log('\\nFinished ERROR')
      })
  }
}