#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>
using namespace std;
using json = nlohmann::json;

int main()
{
    try
    {
        // jsonオブジェクトを作る
        json j;
        j["name"] = "Alice";
        j["age"] = 20;

        // ファイルに書き込む
        std::ofstream ofs("result.json", ios::out);
        if (ofs)
        {
            ofs << j.dump(4); // インデント幅を4に指定
            ofs.close();
            std::cout << "ファイルに書き込みました" << std::endl;
        }
        else
        {
            std::cout << "ファイルを開けませんでした" << std::endl;
        }
    }
    catch (std::exception &e)
    {
        // 例外が発生した場合はエラーメッセージを表示する
        std::cout << "エラーが発生しました: " << e.what() << std::endl;
    }

    return 0;
}
