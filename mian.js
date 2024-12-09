function print_odd(n) {
    n = prompt("Please type a positive integer.");
    do
    {
        i = (n + 1) / 2;
        while(i <= n)
        {
            console.log(n);
            n = n - 2;
        }
    }
    while(n > 0);
}