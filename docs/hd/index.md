---
title: Activity
---
## 讲师文化活动

#### 

[在线运行](https://www.lddgo.net/code/runcode/go)

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	names := []string{
	    "张凤兰", "王巧贤", "阮珊珊", "谢焕婷", "李婕妤", "李  广", "刘  云", 
	    "邓远锋", "吴宗澍", "曾文龙", "黄  彦", "刘银华", "肖夜华", "严成发", 
	    "文孔燊", "洪序滨", "江锦文", "张乐瑶", "张镜明", "陈智雄", "陈珍旭", 
	    "王莞琳", "王和富", "王则钰", "王  杰",
	}
	
	excludedNames := map[string]struct{}{
		"王则钰": struct{}{},
		"张镜明": struct{}{},
		"李  广": struct{}{},
	}

	rand.Seed(time.Now().UnixNano())

	selectedName := getRandomName(names, excludedNames)
	fmt.Println("本次幸运点评观众是:", selectedName)
}

func getRandomName(names []string, excludedNames map[string]struct{}) string {
	for {
		randomIndex := rand.Intn(len(names))
		selectedName := names[randomIndex]

		if _, excluded := excludedNames[selectedName]; !excluded {
			return selectedName
		}
	}
}

```