# git提交操作
# bash终端
# sh push.sh
# 直接进行build的操作
# sh push.sh build
# 直接进行push的操作
# sh push.sh push
buildFun() {
    echo -e "\033[43;37m build & push start \033[0m"
    echo -e "\033[46;37;4m git pull \033[0m"
    git pull
    echo -e "\033[46;37;4m git status \033[0m"
    git status
    echo -e "\033[46;37;4m npm run build \033[0m"
    npm run build
    echo -e "\033[46;37;4m git add . \033[0m"
    git add .
    echo -e "\033[46;37;4m git commit -m 部署 \033[0m"
    git commit -m "部署"
    echo -e "\033[46;37;4m git push \033[0m"
    git push
    echo -e "\033[43;37m build & push finish \033[0m"
}
if [[ $1 && $1 == 'build' ]]
then
    buildFun
else
    echo -e "\033[43;37m $(date "+%Y-%m-%d %H:%M:%S") code start \033[0m"
    cd ./
    echo -e "\033[46;37;4m git status \033[0m"
    git status
    echo -e "\033[41;37m 可进行单个提交, . => 全部提交 \033[0m"
    read -p  "请选择提交文件:" addMsg
    if [ $addMsg == '.' ]
    then
        echo -e "\033[46;37;4m git add . \033[0m"
        git add .
    else
        echo -e "\033[46;37;4m git add $addMsg \033[0m"
        git add $addMsg
    fi
    read -p  "请输入commit注释:" commitMsg
    echo -e '\033[46;37;4m git commit -m "'$commitMsg'" \033[0m'
    git commit -m "$commitMsg"
    echo -e "\033[46;37;4m git pull \033[0m"
    git pull
    echo -e "\033[46;37;4m git status \033[0m"
    git status
    echo -e "\033[41;37m y：press continue, others exit! \033[0m"
    read -p  "是否继续push:" pushMsg
    if [ $pushMsg ]
    then
        if [[ $pushMsg == 'y' || $pushMsg == 'Y' ]] 
        then
            echo -e "\033[46;37;4m git push \033[0m"
            git push
            echo -e "\033[43;37m $1 \033[0m"
            if [[ $1 && $1 == 'push' ]]
            then
                echo -e "\033[43;37m code push finish \033[0m"
            else
                echo -e "\033[43;37m code push finish \033[0m"
                echo -e "\033[41;37m y：press continue, others exit! \033[0m"
                read -p  "是否继续build:" buildMsg
                #继续完善build的判断if逻辑
                if [ $buildMsg ]
                then
                    if [[ $buildMsg == 'y' || $buildMsg == 'Y' ]]
                    then
                        buildFun
                    fi
                fi
            fi
        fi
    fi
fi