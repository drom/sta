[![Travis Status](https://travis-ci.org/drom/sta.svg?branch=master)](https://travis-ci.org/drom/sta)
[![Appveyor status](https://ci.appveyor.com/api/projects/status/wwhf05s3ej4fm75h?svg=true)](https://ci.appveyor.com/project/drom/sta)

# STA

```
npm i sta

bin/sta.js test/path1.json > path1.svg
```

## Altera Quartus report parser.

```
bin/quartus.js prj.sta.rpt > prj.json
```

![ISA](https://rawgit.com/drom/sta/master/path1.svg)

## icestorm JSON support

```
bin/sta.js --icestorm test/icestorm.json > icestorm.svg
```

![ISA](https://rawgit.com/drom/sta/master/icestorm.svg)


## Native JSON format

```js
[ <-- group of paths
  [ <-- each path
    { <-- each time interval
      "total": 2.41,
      "incr": 0,
      "meta": "RR",
      "type": "CELL", <-- cell
      "element": [
        "ir0[8]",
        "q"
      ]
    },
    {
      "total": 3.017,
      "incr": 0.607,
      "meta": "RR",
      "type": "IC", <-- wire
      "element": [
        "u_tail_offset",
        "u_len0010",
        "len[0]~0",
        "dataa"
      ]
    }
    ...
  ]
  ...
]
```
