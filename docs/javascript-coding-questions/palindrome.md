## Palindrome questions are very common in JavaScript / Node.js interviews, and interviewers often ask them in multiple variations. I’ll show you 5 important approaches, explain when to use them, and also cover advanced interview variations.

# 1️⃣ Two Pointer Approach (Best Approach)

```js
function isPalindrome(str) {
    let j = str.length - 1
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] != str[j]) {
            return false;
        }
       
     j--;
       
    }
    return true;
}

```

## Complexity

```js
Time Complexity: O(n)
Space Complexity: O(1)
```


# 2️⃣ Reverse String Method (Simple)

## This is the easiest solution, but uses extra memory.

```js
function isPalindrome(str){
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}
```


## Complexity

```js
Time Complexity: O(n)
Space Complexity: O(n)
```

# 3️⃣ Using Recursion

## Sometimes interviewers ask recursive solutions.

```js 
function isPalindromeUsingRecursive(str,left = 0 ,right = str.length - 1){

    console.log("Left ", left);
    console.log("right ", right);

    if(left >= right){
        return true;
    }
   

    if(str[left] !== str[right]){
        return false;
    }

    return isPalindrome(str, left + 1, right - 1);


}
``` 

## Complexity

```js
Time: O(n)
Space: O(n) (call stack)

```

# 4️⃣ Ignore Spaces and Special Characters (Real Interview Question)

##  "A man, a plan, a canal: Panama"

```js
function isPalindromeWithSpaceAndComa(str)
{   
    // clean string , remove space and comvert in to lower case
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g,'');

    let left = 0;
    let right = cleanStr.length - 1;
    
    

    while(left < right){
        console.log("left ", left);
        console.log("right", right);
        if(cleanStr[left] !== cleanStr[right]){
            return false;
        }

        left++;
        right--;
    }

    return true;


}
```

