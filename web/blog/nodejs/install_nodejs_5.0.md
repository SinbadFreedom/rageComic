Linux ��װNodejs5.0

������ʹ��Դ�����,����ppa���������ְ�װ��ʽ�ֱ������˲�ͬ�����⡣
Դ�����ʱ����gcc, g++��4.8�Ժ��Ҳ���cc����.
ppa�����nodejs�汾�Ƚ���

�����ҵ���һ�ֺܷ���İ�װ��ʽ,��ͨ��nvm���װ���л�nodejs�ű�.

nvm�ǵ�github�е�һ����Դ��Ŀ:   
    https://github.com/creationix/nvm

��װ����:


1. ���ذ�װNVM�ű�   
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash   
��   
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash   
2. ִ�нű�   
source ~/.nvm/nvm.sh
3. �鿴nodejs�汾
�����Ѱ�װnodejs�汾
nvm ls
Զ�˰汾
nvm ls-remote
4. ��װnodejs�汾
To download, compile, and install the latest v5.0.x release of node, do this:

    nvm install 5.0
And then in any new shell just use the installed version:

    nvm use 5.0
Or you can just run it:

    nvm run 5.0 --version
Or, you can run any arbitrary command in a subshell with the desired version of node:

    nvm exec 4.2 node --version
You can also get the path to the executable to where it was installed:

    nvm which 5.04.4



�����˼������ڣ�����sourceÿ�ιرտ���̨�Ͳ�������
����취��

vim /etc/profile
д�룺

source ~/.bashrc   
source ~/.nvm/nvm.sh   