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
	names := []string{"张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"}
	excludedNames := map[string]struct{}{
		"张三": struct{}{},
		"李四": struct{}{},
		"王五": struct{}{},
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