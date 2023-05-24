class ShowInvalidFileNameChars
{
    public static void Main()
    {
        char[] invalidPathChars = Path.GetInvalidPathChars();

        Console.WriteLine("The following characters are invalid in a path:");
        ShowChars(invalidPathChars);
        Console.WriteLine();

        char[] invalidFileChars = Path.GetInvalidFileNameChars();

        Console.WriteLine("The following characters are invalid in a filename:");
        ShowChars(invalidFileChars);
    }

    public static void ShowChars(char[] charArray)
    {
        Console.WriteLine("Char\tHex Value");

        foreach (char someChar in charArray)
        {
            if (Char.IsWhiteSpace(someChar))
            {
                Console.WriteLine(",\t{0:X4}", (int)someChar);
            }
            else
            {
                Console.WriteLine("{0:c},\t{1:X4}", someChar, (int)someChar);
            }
        }
    }
}