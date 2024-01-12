class DotNetEnvTest
{
    public static void Main()
    {
        DotNetEnv.Env.Load();

        Console.WriteLine($"SAMPLE_VALUE={DotNetEnv.Env.GetInt("SAMPLE_VALUE")}");
        Console.WriteLine($"SAMPLE_PATH={DotNetEnv.Env.GetString("SAMPLE_PATH")}");
    }
}