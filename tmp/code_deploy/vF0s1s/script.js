// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    
    // 获取DOM元素
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    
    // 移动端菜单切换功能
    menuToggle.addEventListener('click', function() {
        // 切换菜单的激活状态
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // 切换aria-expanded属性以提升可访问性
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 移除所有链接的active类
            navLinks.forEach(item => item.classList.remove('active'));
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
            
            // 如果是移动端，关闭菜单
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // 表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // 阻止默认表单提交
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 在实际应用中，这里会发送数据到服务器
            // 现在只是模拟提交成功
            alert(`感谢 ${name} 提交信息！我们会尽快通过 ${email} 与您联系。`);
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // 滚动时高亮当前导航链接
    window.addEventListener('scroll', function() {
        // 获取所有部分
        const sections = document.querySelectorAll('section[id]');
        
        // 获取当前滚动位置
        const scrollPosition = window.scrollY + 100;
        
        // 遍历所有部分
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // 检查当前滚动位置是否在部分内
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有链接的active类
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 为当前部分对应的链接添加active类
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // 点击页面其他地方关闭移动端菜单
    document.addEventListener('click', function(e) {
        // 如果点击的不是菜单按钮或导航菜单，并且菜单是打开的
        if (!menuToggle.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // 窗口大小改变时，如果切换到桌面视图，确保菜单是可见的
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // 服务卡片悬停效果增强
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 控制台欢迎信息
    console.log('欢迎来到简单网站！');
    console.log('这是一个使用纯HTML、CSS和JavaScript构建的响应式网站。');
});