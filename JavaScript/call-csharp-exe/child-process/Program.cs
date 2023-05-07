class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine($"This Process was Called.");

        for (int i = 0; i < args.Length; i++)
        {
            Console.WriteLine($"args{i + 1} = {args[i]}");
        }

        Console.WriteLine("Final line can be used as return value.");
    }
}