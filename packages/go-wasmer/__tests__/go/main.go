package main

import (
	"fmt"
	"os"
	"strconv"
)

//go:export sum
func Add(a, b int) int {
	return a + b
}

func main() {
	args := os.Args[1:]
	if len(args) < 2 {
		fmt.Println("args < 2")
	}
	a, _ := strconv.Atoi(args[0])
	b, _ := strconv.Atoi(args[1])
	fmt.Println(Add(a, b), "Hello world")
}
