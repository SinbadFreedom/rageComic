CentOS�������װ���߲���apt-get  ��yum   

��װtmux֮ǰ��Ҫ�Ȱ�װһЩ֧�ֵ����:   

    yum install libevent-devel ncurses-devel   

��������������Դ������а�װ�ˣ�����Ҫ˵��һ�㣺��ĿǰΪֹ��tmux�����°汾��1.8���������Ҳ���1.8�ڱ����ʱ������СС�����⣬���Խ���ѡ���һ��İ汾��1.6/1.7���ɡ�   

    wget http://downloads.sourceforge.net/tmux/tmux-1.6.tar.gz
    tar zxvf tmux-1.6.tar.gz
    cd tmux-1.6
    ./configure
    make
    make install


-- ����ʹ��   

    tmux   # ���� tmux -2 ��256�ն�����
    C-b d  # ������ shell �� tmux �����ں�̨���У����������Ҳ��������״̬
    tmux ls # ��ʾ����tmux�Ự��C-b s��
    tmux attach-session -t ���� # ѡ��tmux
    tmux new-session -s session-name
    tmux kill-session -t session-name
    
-- ��ݼ�

    tmux ��ʹ����Ҫ����������ݼ���ͨ�� C-b �����á�
    C-b ?  // ��ʾ��ݼ�����
    C-b C-o  //��������λ��
    C-b �ո��  //������һ�����ò���
    C-b ! // �ѵ�ǰ���ڱ�Ϊ�´���
    C-b  "  // ģ��ָ�����
    C-b % // ����ָ�����
    C-b q // ��ʾ�ָ����ڵı��
    C-b o // ������һ���ָ�����
    C-b ���¼� // ��һ������һ���ָ�����
    C-b C-����� //�����ָ����ڴ�С
    C-b & // ȷ�Ϻ��˳� tmux
    C-b c // �����´���
    C-b 0~9 //ѡ�񼸺Ŵ���
    C-b c // �����´���
    C-b n // ѡ����һ������
    C-b l // ���ʹ�õĴ���
    C-b p // ѡ��ǰһ������
    C-b w // �Բ˵���ʽ��ʾ��ѡ�񴰿�
    C-b s // �Բ˵���ʽ��ʾ��ѡ��Ự
    C-b t //��ʾʱ��
    C-b [ ����(�ո�ʼ)
    C-b ] ճ�����س�������
    C-b ,������ǰ���ڸ���