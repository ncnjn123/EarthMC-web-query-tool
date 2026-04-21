/**
 * EarthMC UI Effects - 交互效果脚本
 * 包含: 粒子飘浮(CSS) + 打字震动 + 涟漪效果 + 加载动画
 */

(function() {
  'use strict';

  // ===== 1. 打字震动效果 =====
  function initShakeEffect() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        this.classList.add('input-shake');
        setTimeout(() => this.classList.remove('input-shake'), 200);
      });
    });
  }

  // ===== 2. 涟漪效果 =====
  function initRippleEffect() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        // 创建涟漪元素
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        // 计算涟漪位置
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        // 动画结束后移除
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ===== 3. 加载动画 =====
  // 创建加载遮罩层（如果不存在）
  function createLoadingOverlay() {
    if (document.querySelector('.loading-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">查询中...</div>
    `;
    document.body.appendChild(overlay);
  }

  // 显示加载动画
  window.showLoading = function(text = '查询中...') {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
      createLoadingOverlay();
      overlay = document.querySelector('.loading-overlay');
    }
    overlay.querySelector('.loading-text').textContent = text;
    overlay.classList.add('active');
  };

  // 隐藏加载动画
  window.hideLoading = function() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  };

  // ===== 4. 输入框焦点发光效果 =====
  function initInputGlow() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.classList.add('input-glow');
      });
      input.addEventListener('blur', function() {
        this.classList.remove('input-glow');
      });
    });
  }

  // ===== 5. 导航悬停效果增强 =====
  function initNavEffects() {
    const navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      link.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // ===== 初始化所有效果 =====
  function init() {
    initShakeEffect();
    initRippleEffect();
    initInputGlow();
    initNavEffects();
    createLoadingOverlay();
    
    // 监听 DOM 变化，为动态添加的元素绑定效果
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          initShakeEffect();
          initRippleEffect();
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
