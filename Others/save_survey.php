<?php
// 检查是否有数据通过POST方法提交
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    date_default_timezone_set('Asia/Shanghai'); // 设置为上海时区
    $current_time = date('Y-m-d H:i:s');

    // 将POST数据收集到变量中
    $gender = $_POST['gender'] ?? '未填写';
    $grade = $_POST['grade'] ?? '未填写';
    $college = $_POST['college'] ?? '未填写';
    $major = $_POST['major'] ?? '未填写';

    // 处理复选框的数据，可能有多个值
    $life_importance = isset($_POST['life_importance']) ? implode(", ", $_POST['life_importance']) : '未填写';
    $life_importance_other = $_POST['life_importance_other'] ?? '';
    $personal_success = isset($_POST['personal_success']) ? implode(", ", $_POST['personal_success']) : '未填写';
    $personal_success_other = $_POST['personal_success_other'] ?? '';
    $definition_of_happiness = $_POST['definition_of_happiness'] ?? '未填写';
    $coping_with_setbacks = $_POST['coping_with_setbacks'] ?? '未填写';
    $value_of_life = $_POST['value_of_life'] ?? '未填写';
    $life_ideal = isset($_POST['life_ideal']) ? implode(", ", $_POST['life_ideal']) : '未填写';
    $life_ideal_other = $_POST['life_ideal_other'] ?? '';
    $key_to_life_ideal = $_POST['key_to_life_ideal'] ?? '未填写';
    $five_year_plan = $_POST['five_year_plan'] ?? '未填写';
    $opportunities_challenges = $_POST['opportunities_challenges'] ?? '未填写';

    // 创建一个数据字符串，每个值之间用逗号分隔
    $data = "\"$gender\", \"$grade\", \"$college\", \"$major\", \"$life_importance\", \"$life_importance_other\", \"$personal_success\", \"$personal_success_other\", \"$definition_of_happiness\", \"$coping_with_setbacks\", \"$value_of_life\", \"$life_ideal\", \"$life_ideal_other\", \"$key_to_life_ideal\", \"$five_year_plan\", \"$opportunities_challenges\"\n";

    // 指定要写入数据的文件
    $file = "survey_results.csv";

    // 打开文件准备写入，如果文件不存在则创建
    if ($handle = fopen($file, "a")) {
        // 写入数据
        fwrite($handle, $data);
        // 关闭文件处理器
        fclose($handle);
        // 简单的确认信息
        echo "问卷数据保存成功！";
    } else {
        // 文件打开失败的错误处理
        echo "无法打开文件保存问卷数据。";
    }
} else {
    // 如果不是通过POST提交的，就跳转回问卷页面
    header('Location: wj.html');
}
?>

