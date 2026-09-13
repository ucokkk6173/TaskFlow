/**
 * ==========================================================================
 * TASKFLOW — MODERN PRODUCTIVITY & TASK MANAGEMENT ENGINE
 * Clean Architecture: Repository Pattern, Web Audio API, Pomodoro & Kanban
 * ==========================================================================
 */

// --- 1. DEFAULT DATA & CONSTANTS ---
const DEFAULT_CATEGORIES = [
  { id: 'cat-personal', name: 'Personal', color: '#10b981' },
  { id: 'cat-work', name: 'Work', color: '#6366f1' },
  { id: 'cat-study', name: 'Study', color: '#f59e0b' },
  { id: 'cat-coding', name: 'Coding', color: '#3b82f6' },
  { id: 'cat-shopping', name: 'Shopping', color: '#ec4899' },
  { id: 'cat-other', name: 'Other', color: '#8b5cf6' }
];

const INITIAL_SAMPLE_TASKS = [
  {
    id: 'task-1',
    title: 'Refine TaskFlow SaaS Design System Tokens',
    description: 'Implement dark/light mode CSS custom properties, hair-line borders, and Linear-style typography.',
    priority: 'urgent',
    category: 'cat-work',
    status: 'completed',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-1', text: 'Configure semantic color tokens', completed: true },
      { id: 'sub-2', text: 'Design responsive navigation and layout', completed: true },
      { id: 'sub-3', text: 'Test micro-interactions and smooth transitions', completed: true }
    ],
    createdAt: Date.now() - 172800000
  },
  {
    id: 'task-2',
    title: 'Build Interactive Kanban Workflow Board',
    description: 'Implement native HTML5 drag-and-drop mechanics to smoothly transition tasks across stages.',
    priority: 'high',
    category: 'cat-coding',
    status: 'in_progress',
    dueDate: new Date().toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-4', text: 'Add dragover and drop handlers', completed: true },
      { id: 'sub-5', text: 'Update column counters dynamically', completed: true }
    ],
    createdAt: Date.now() - 86400000
  },
  {
    id: 'task-3',
    title: 'Integrate Focus Pomodoro Timer with Audio Chimes',
    description: 'Synthesize crisp Web Audio feedback without external audio files for deep work intervals.',
    priority: 'medium',
    category: 'cat-work',
    status: 'todo',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-6', text: 'Build circular SVG progress counter', completed: false },
      { id: 'sub-7', text: 'Hook task completion trigger', completed: false }
    ],
    createdAt: Date.now() - 43200000
  },
  {
    id: 'task-4',
    title: 'Read 20 pages of "Designing Data-Intensive Applications"',
    description: 'Daily continuous study routine on distributed system architectures.',
    priority: 'low',
    category: 'cat-study',
    status: 'todo',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    subtasks: [],
    createdAt: Date.now() - 20000000
  },
  {
    id: 'task-5',
    title: 'Review Backend API Schema & Database Design',
    description: 'Prepare RESTful API endpoints, PostgreSQL schema migration scripts, and authentication tokens.',
    priority: 'urgent',
    category: 'cat-work',
    status: 'todo',
    dueDate: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-8', text: 'Draft CRUD route specifications', completed: false },
      { id: 'sub-9', text: 'Define JWT auth payload structure', completed: false }
    ],
    createdAt: Date.now() - 259200000
  }
];

const NOTIFICATION_READ_KEY = 'taskflow_notifications_read';

// --- 2. SOUND SERVICE (Pure Web Audio API Synthesizer) ---
class SoundService {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('taskflow_sound') !== 'false';
  }

  initContext() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('taskflow_sound', this.enabled);
    return this.enabled;
  }

  playComplete() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.25); // C6
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.07);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playTrash() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

// --- 3. REPOSITORY & STATE LAYER ---
class TaskRepository {
  constructor() {
    this.STORAGE_KEY = 'taskflow_tasks_data';
    this.CATEGORIES_KEY = 'taskflow_categories_data';
    this.tasks = [];
    this.categories = [];
    this.load();
  }

  load() {
    try {
      const storedTasks = localStorage.getItem(this.STORAGE_KEY);
      this.tasks = storedTasks ? JSON.parse(storedTasks) : [...INITIAL_SAMPLE_TASKS];
    } catch (e) {
      console.error('Error loading tasks:', e);
      this.tasks = [...INITIAL_SAMPLE_TASKS];
    }
    try {
      const storedCats = localStorage.getItem(this.CATEGORIES_KEY);
      this.categories = storedCats ? JSON.parse(storedCats) : [...DEFAULT_CATEGORIES];
      if (!Array.isArray(this.categories) || this.categories.length === 0) {
        this.categories = [...DEFAULT_CATEGORIES];
      }
    } catch (e) {
      console.error('Error loading categories:', e);
      this.categories = [...DEFAULT_CATEGORIES];
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(this.categories));
    } catch (e) {
      console.error('Error saving tasks:', e);
      if (this._onSaveError) this._onSaveError(e);
    }
  }

  getAll() {
    return [...this.tasks];
  }

  getById(id) {
    return this.tasks.find(t => t.id === id);
  }

  add(taskData) {
    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'cat-personal',
      status: taskData.status || 'todo',
      dueDate: taskData.dueDate || '',
      dueTime: taskData.dueTime || '',
      subtasks: taskData.subtasks || [],
      createdAt: Date.now()
    };
    this.tasks.unshift(newTask);
    this.save();
    return newTask;
  }

  update(id, updates) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...updates, updatedAt: Date.now() };
      this.save();
      return this.tasks[idx];
    }
    return null;
  }

  delete(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  deleteMultiple(ids) {
    const idSet = new Set(ids);
    this.tasks = this.tasks.filter(t => !idSet.has(t.id));
    this.save();
  }

  updateStatusMultiple(ids, status) {
    const idSet = new Set(ids);
    this.tasks.forEach(t => {
      if (idSet.has(t.id)) {
        t.status = status;
        t.updatedAt = Date.now();
      }
    });
    this.save();
  }

  clearCompleted() {
    this.tasks = this.tasks.filter(t => t.status !== 'completed');
    this.save();
  }

  resetToDefault() {
    this.tasks = [...INITIAL_SAMPLE_TASKS];
    this.categories = [...DEFAULT_CATEGORIES];
    this.save();
  }

  // Categories
  getCategories() {
    return [...this.categories];
  }

  getCategoryById(id) {
    return this.categories.find(c => c.id === id) || { id: 'unknown', name: 'General', color: '#6366f1' };
  }

  addCategory(name, color) {
    const newCat = {
      id: 'cat_' + Date.now(),
      name: name.trim(),
      color: color || '#6366f1'
    };
    this.categories.push(newCat);
    this.save();
    return newCat;
  }
}

// --- 4. POMODORO TIMER SERVICE ---
class PomodoroService {
  constructor(soundService, onTick, onComplete) {
    this.soundService = soundService;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.modes = {
      pomodoro: 25 * 60,
      short_break: 5 * 60,
      long_break: 15 * 60
    };
    this.currentMode = 'pomodoro';
    this.totalSeconds = this.modes[this.currentMode];
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.timerId = null;
    this.sessionsCompleted = 0;
    this.totalFocusMinutes = 0;
    this.confettiEnabled = true;
  }

  setMode(mode) {
    if (!this.modes[mode]) return;
    this.stop();
    this.currentMode = mode;
    this.totalSeconds = this.modes[mode];
    this.remainingSeconds = this.totalSeconds;
    this.notifyTick();
  }

  toggle() {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.remainingSeconds--;
      this.notifyTick();

      if (this.remainingSeconds <= 0) {
        this.completeSession();
      }
    }, 1000);
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notifyTick();
  }

  reset() {
    this.stop();
    this.remainingSeconds = this.totalSeconds;
    this.notifyTick();
  }

  completeSession() {
    this.stop();
    this.soundService.playComplete();
    
    if (this.currentMode === 'pomodoro') {
      this.sessionsCompleted++;
      this.totalFocusMinutes += 25;
    }
    
    if (this.confettiEnabled && window.confetti) {
      window.confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    }

    if (this.onComplete) {
      this.onComplete(this.currentMode);
    }
    this.reset();
  }

  notifyTick() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const progress = 1 - (this.remainingSeconds / this.totalSeconds);
    
    if (this.onTick) {
      this.onTick({
        formatted,
        remainingSeconds: this.remainingSeconds,
        totalSeconds: this.totalSeconds,
        progress,
        isRunning: this.isRunning,
        mode: this.currentMode,
        sessionsCompleted: this.sessionsCompleted,
        totalFocusMinutes: this.totalFocusMinutes
      });
    }
  }
}

// --- 5. APPLICATION CONTROLLER & UI ENGINE ---
class TaskFlowApp {
  constructor() {
    this.repo = new TaskRepository();
    this.repo._onSaveError = () => this.showToast('Failed to save data. Storage may be full.', 'danger');
    this.sound = new SoundService();
    
    // User Identity
    this.userName = localStorage.getItem('taskflow_user_name') || 'Sahrul';
    this.confettiEnabled = localStorage.getItem('taskflow_confetti') !== 'false';
    this.greetingStyle = localStorage.getItem('taskflow_greeting_style') || 'dynamic';
    
    // UI State
    this.currentNav = 'all'; // 'dashboard', 'all', 'today', 'upcoming', 'completed', 'kanban', 'focus', 'category'
    this.currentView = 'list'; // 'dashboard', 'list', 'kanban', 'focus'
    this.currentStatusFilter = 'all'; // 'all', 'active', 'completed', 'today', 'upcoming', 'overdue'
    this.currentCategoryFilter = 'all'; // 'all', 'cat-personal', 'cat-work', etc.
    this.currentSearchQuery = '';
    this.currentSort = 'newest'; // 'newest', 'oldest', 'priority_desc', 'priority_asc', 'due_asc', 'due_desc'
    
    this.isBulkMode = false;
    this.selectedTaskIds = new Set();
    this.tempModalSubtasks = [];

    // Accessibility: Modal focus management state
    this._modalTrigger = null;
    this._activeModal = null;
    this._handleFocusTrap = this._handleFocusTrap.bind(this);

    // Notifications Store
    this.notifications = this.generateSampleNotifications();
    this.loadNotificationReadState();

    // Pomodoro Timer
    this.pomodoro = new PomodoroService(
      this.sound,
      (state) => this.renderTimerTick(state),
      (mode) => this.handleTimerComplete(mode)
    );
    this.pomodoro.confettiEnabled = this.confettiEnabled;

    this.initElements();
    this.initEventListeners();
    this.initTheme();
    this.updateGreeting();
    this.updateUserProfileDisplay();
    this.renderNotifications();
    this.render();
  }

  initElements() {
    // Shell & Sidebar
    this.appLayout = document.getElementById('app');
    this.sidebar = document.getElementById('sidebar');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');

    // Header Elements
    this.headerGreetingText = document.getElementById('header-greeting-text');
    this.headerGreetingSub = document.getElementById('header-greeting-sub');
    this.searchInput = document.getElementById('global-search-input');
    this.searchClearBtn = document.getElementById('search-clear-btn');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.themeIcon = document.getElementById('theme-icon');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');

    // Notification Dropdown Elements
    this.notificationBtn = document.getElementById('notification-btn');
    this.notificationBadge = document.getElementById('notification-badge');
    this.notificationDropdown = document.getElementById('notification-dropdown');
    this.notificationList = document.getElementById('notification-list');
    this.notifCountBadge = document.getElementById('notif-count-badge');
    this.btnMarkAllRead = document.getElementById('btn-mark-all-read');

    // Profile Avatar Elements
    this.profileMenuBtn = document.getElementById('profile-menu-btn');
    this.profileDropdown = document.getElementById('profile-dropdown');
    this.profileBtnSettings = document.getElementById('profile-btn-settings');
    this.profileBtnShortcuts = document.getElementById('profile-btn-shortcuts');
    this.profileBtnSample = document.getElementById('profile-btn-sample');
    this.profileBtnLogout = document.getElementById('profile-btn-logout');

    // Views
    this.viewDashboardContainer = document.getElementById('view-dashboard-container');
    this.viewListContainer = document.getElementById('view-list-container');
    this.viewKanbanContainer = document.getElementById('view-kanban-container');
    this.viewFocusContainer = document.getElementById('view-focus-container');

    // Dashboard View Elements
    this.dashDueCount = document.getElementById('dash-due-count');
    this.dashTotalCount = document.getElementById('dash-total-count');
    this.dashCompletedCount = document.getElementById('dash-completed-count');
    this.dashPendingCount = document.getElementById('dash-pending-count');
    this.dashOverdueCount = document.getElementById('dash-overdue-count');
    this.dashTodayTasksList = document.getElementById('dash-today-tasks-list');
    this.dashCategoriesBreakdown = document.getElementById('dash-categories-breakdown');
    // LANGKAH 5 — Your Productivity elements
    this.yourProdPercent = document.getElementById('your-productivity-percent');
    this.yourProdFill = document.getElementById('your-productivity-fill');
    this.yourProdSubtext = document.getElementById('your-productivity-subtext');

    this.btnDashNewTask = document.getElementById('btn-dash-new-task');
    this.btnDashFocus = document.getElementById('btn-dash-focus');
    this.btnDashQuickFocus = document.getElementById('btn-dash-quick-focus');
    this.btnViewAllToday = document.getElementById('btn-view-all-today');

    // Quick Composer in List View
    this.quickAddForm = document.getElementById('quick-add-form');
    this.quickTaskTitle = document.getElementById('quick-task-title');
    this.quickTaskPriority = document.getElementById('quick-task-priority');
    this.quickTaskCategory = document.getElementById('quick-task-category');
    this.quickTaskDate = document.getElementById('quick-task-date');
    this.btnOpenAdvancedModal = document.getElementById('btn-open-advanced-modal');
    this.btnQuickNewTask = document.getElementById('btn-quick-new-task');

    // List View Controls (LANGKAH 11 & 12)
    this.tasksList = document.getElementById('tasks-list');
    this.tasksEmptyState = document.getElementById('tasks-empty-state');
    this.filterCategorySelect = document.getElementById('filter-category-select');
    this.sortTasksSelect = document.getElementById('sort-tasks-select');
    this.btnToggleBulkMode = document.getElementById('btn-toggle-bulk-mode');
    this.bulkActionBar = document.getElementById('bulk-action-bar');
    this.bulkSelectedCount = document.getElementById('bulk-selected-count');
    this.btnBulkComplete = document.getElementById('btn-bulk-complete');
    this.btnBulkPriority = document.getElementById('btn-bulk-priority');
    this.btnBulkDelete = document.getElementById('btn-bulk-delete');
    this.btnBulkCancel = document.getElementById('btn-bulk-cancel');

    // Headings & Metrics
    this.currentViewHeading = document.getElementById('current-view-heading');
    this.currentViewDesc = document.getElementById('current-view-desc');
    this.statTotalCount = document.getElementById('stat-total-count');
    this.statCompletedCount = document.getElementById('stat-completed-count');
    this.statPendingCount = document.getElementById('stat-pending-count');
    this.statOverdueCount = document.getElementById('stat-overdue-count');
    this.sidebarProgressFill = document.getElementById('sidebar-progress-fill');
    this.sidebarCompletedText = document.getElementById('sidebar-completed-text');
    this.sidebarPercentText = document.getElementById('sidebar-percent-text');
    this.categoriesList = document.getElementById('categories-list');

    // Kanban Elements
    this.kanbanCardsTodo = document.getElementById('kanban-cards-todo');
    this.kanbanCardsInProgress = document.getElementById('kanban-cards-in_progress');
    this.kanbanCardsCompleted = document.getElementById('kanban-cards-completed');
    this.kanbanCountTodo = document.getElementById('kanban-count-todo');
    this.kanbanCountInProgress = document.getElementById('kanban-count-in-progress');
    this.kanbanCountCompleted = document.getElementById('kanban-count-completed');
    this.btnKanbanAddTask = document.getElementById('btn-kanban-add-task');

    // Focus View Elements
    this.focusTimerDigits = document.getElementById('focus-timer-digits');
    this.focusTimerStatusText = document.getElementById('focus-timer-status-text');
    this.pomodoroProgressRing = document.getElementById('pomodoro-progress-ring');
    this.btnTimerToggle = document.getElementById('btn-timer-toggle');
    this.btnTimerReset = document.getElementById('btn-timer-reset');
    this.timerPlayIcon = document.getElementById('timer-play-icon');
    this.timerBtnText = document.getElementById('timer-btn-text');
    this.focusTaskSelect = document.getElementById('focus-task-select');
    this.btnFocusCompleteTask = document.getElementById('btn-focus-complete-task');
    this.pomodoroCompletedCount = document.getElementById('pomodoro-completed-count');
    this.focusMinutesCount = document.getElementById('focus-minutes-count');

    // Task Modal Elements
    this.taskModal = document.getElementById('task-modal');
    this.taskModalForm = document.getElementById('task-modal-form');
    this.modalTaskId = document.getElementById('modal-task-id');
    this.modalTaskTitle = document.getElementById('modal-task-title');
    this.modalTaskDesc = document.getElementById('modal-task-desc');
    this.modalTaskPriority = document.getElementById('modal-task-priority');
    this.modalTaskCategory = document.getElementById('modal-task-category');
    this.modalTaskStatus = document.getElementById('modal-task-status');
    this.modalTaskDueDate = document.getElementById('modal-task-duedate');
    this.modalTaskDueTime = document.getElementById('modal-task-duetime');

    // LANGKAH 9 — Delete confirmation modal
    this.confirmDeleteModal = document.getElementById('confirm-delete-modal');
    this.confirmDeleteTaskTitle = document.getElementById('confirm-delete-task-title');
    this.pendingDeleteId = null;
    this.modalSubtasksList = document.getElementById('modal-subtasks-list');
    this.modalSubtasksProgress = document.getElementById('modal-subtasks-progress');
    this.modalNewSubtaskInput = document.getElementById('modal-new-subtask-input');
    this.btnAddSubtask = document.getElementById('btn-add-subtask');
    this.modalBtnDelete = document.getElementById('modal-btn-delete');
    this.modalBtnCancel = document.getElementById('modal-btn-cancel');
    this.modalCloseBtn = document.getElementById('modal-close-btn');

    // Category Modal Elements
    this.categoryModal = document.getElementById('category-modal');
    this.categoryModalForm = document.getElementById('category-modal-form');
    this.categoryNameInput = document.getElementById('category-name-input');
    this.categoryModalClose = document.getElementById('category-modal-close');
    this.categoryModalCancel = document.getElementById('category-modal-cancel');
    this.btnAddCategory = document.getElementById('btn-add-category');

    // Shortcuts Modal
    this.shortcutsModal = document.getElementById('shortcuts-modal');
    this.shortcutsModalClose = document.getElementById('shortcuts-modal-close');

    // Settings Modal Elements
    this.settingsModal = document.getElementById('settings-modal');
    this.settingsModalClose = document.getElementById('settings-modal-close');
    this.settingsModalSave = document.getElementById('settings-modal-save');
    this.settingsInputName = document.getElementById('settings-input-name');
    this.btnSettingsTheme = document.getElementById('btn-settings-theme');
    this.settingsThemeIcon = document.getElementById('settings-theme-icon');
    this.settingsThemeText = document.getElementById('settings-theme-text');
    this.btnSettingsSound = document.getElementById('btn-settings-sound');
    this.settingsSoundIcon = document.getElementById('settings-sound-icon');
    this.settingsSoundText = document.getElementById('settings-sound-text');
    this.settingsConfettiToggle = document.getElementById('settings-confetti-toggle');
    this.btnSettingsExport = document.getElementById('btn-settings-export');
    this.settingsImportFile = document.getElementById('settings-import-file');
    this.btnSettingsSample = document.getElementById('btn-settings-sample');
    this.btnSettingsClearDone = document.getElementById('btn-settings-clear-done');
    this.btnSettingsResetAll = document.getElementById('btn-settings-reset-all');

    this.btnEmptyAddTask = document.getElementById('btn-empty-add-task');
    this.toastContainer = document.getElementById('toast-container');
  }

  initEventListeners() {
    // Mobile Sidebar
    this.mobileMenuBtn?.addEventListener('click', () => {
      this.sidebar.classList.add('open');
      this.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    });
    this.sidebarCloseBtn?.addEventListener('click', () => {
      this.sidebar.classList.remove('open');
      this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    });
    this.sidebarOverlay?.addEventListener('click', () => {
      this.sidebar.classList.remove('open');
      this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    });

    // Theme Toggle
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());

    // Sound Toggle
    this.soundToggleBtn?.addEventListener('click', () => {
      const state = this.sound.toggle();
      this.showToast(state ? 'Audio chime feedback enabled' : 'Audio chime muted', 'info');
      this.updateSoundIcon();
    });
    this.updateSoundIcon();

    // Sidebar Main Menu & Navigation Items
    document.querySelectorAll('.sidebar-scrollable .nav-btn[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const navTarget = btn.dataset.nav;
        this.navigate(navTarget);
        this.sidebar.classList.remove('open');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      });
    });

    // Segmented Header View Switcher (List, Board, Focus)
    document.querySelectorAll('.segment-btn[data-view-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.viewTarget;
        this.navigate(target);
      });
    });

    // Notification Dropdown Toggle
    this.notificationBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.profileDropdown?.classList.remove('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
      this.notificationDropdown?.classList.toggle('show');
      this.notificationBtn?.setAttribute('aria-expanded', this.notificationDropdown?.classList.contains('show'));
    });

    this.btnMarkAllRead?.addEventListener('click', () => {
      this.markAllNotificationsRead();
    });

    // Profile Dropdown Toggle
    this.profileMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.notificationDropdown?.classList.remove('show');
      this.notificationBtn?.setAttribute('aria-expanded', 'false');
      this.profileDropdown?.classList.toggle('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', this.profileDropdown?.classList.contains('show'));
    });

    this.profileBtnSettings?.addEventListener('click', () => {
      this.profileDropdown?.classList.remove('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
      this.openSettingsModal();
    });

    this.profileBtnShortcuts?.addEventListener('click', () => {
      this.profileDropdown?.classList.remove('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
      this.openShortcutsModal();
    });

    this.profileBtnSample?.addEventListener('click', () => {
      this.profileDropdown?.classList.remove('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
      this.repo.resetToDefault();
      this.showToast('Sample tasks reloaded', 'info');
      this.render();
    });

    this.profileBtnLogout?.addEventListener('click', () => {
      this.profileDropdown?.classList.remove('show');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
      this.showToast(`Goodbye, ${this.userName}! See you soon 👋`, 'info');
    });

    // Global Click outside dropdowns
    document.addEventListener('click', () => {
      this.notificationDropdown?.classList.remove('show');
      this.profileDropdown?.classList.remove('show');
      this.notificationBtn?.setAttribute('aria-expanded', 'false');
      this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
    });

    // Dashboard View Buttons
    this.btnDashNewTask?.addEventListener('click', () => this.openTaskModal());
    this.btnDashFocus?.addEventListener('click', () => this.navigate('focus'));
    this.btnDashQuickFocus?.addEventListener('click', () => this.navigate('focus'));
    this.btnViewAllToday?.addEventListener('click', () => this.navigate('today'));

    // Statistic Cards Interactive Click (Dashboard & List View)
    document.querySelectorAll('.metric-card[data-stat-target]').forEach(card => {
      card.addEventListener('click', () => {
        const target = card.dataset.statTarget;
        if (target) {
          this.sound?.playPop?.();
          this.navigate(target);
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = card.dataset.statTarget;
          if (target) {
            this.sound?.playPop?.();
            this.navigate(target);
          }
        }
      });
    });

    // Filter Tabs (LANGKAH 11: All, Active, Completed, Today, Upcoming, Overdue)
    document.querySelectorAll('.filter-tab-btn[data-status-filter]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentStatusFilter = tab.dataset.statusFilter;

        // Sync sidebar active highlight if matching
        if (['all', 'today', 'upcoming', 'completed', 'overdue'].includes(this.currentStatusFilter)) {
          this.currentNav = this.currentStatusFilter;
          document.querySelectorAll('.sidebar-scrollable .nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.nav === this.currentStatusFilter);
          });
        }

        this.sound?.playPop?.();
        this.renderTaskList();
        this.renderStats();
      });
    });

    // Category Filter Dropdown (LANGKAH 11: All, Personal, Work, Study, Coding, Shopping, Other)
    this.filterCategorySelect?.addEventListener('change', (e) => {
      this.currentCategoryFilter = e.target.value;
      
      // Sync sidebar categories active pill
      document.querySelectorAll('.category-nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.categoryId === this.currentCategoryFilter);
      });

      this.sound?.playPop?.();
      this.renderTaskList();
      this.renderStats();
    });

    // Sorting Dropdown (LANGKAH 12: Newest, Oldest, Priority High->Low, Priority Low->High, Deadline nearest, Deadline latest)
    this.sortTasksSelect?.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderTaskList();
    });

    // Global Command Search
    this.searchInput?.addEventListener('input', (e) => {
      this.currentSearchQuery = e.target.value.toLowerCase().trim();
      this.searchClearBtn?.classList.toggle('hidden', !this.currentSearchQuery);
      if (this.currentView === 'dashboard') {
        this.navigate('all');
      } else {
        this.render();
      }
    });

    this.searchClearBtn?.addEventListener('click', () => {
      this.searchInput.value = '';
      this.currentSearchQuery = '';
      this.searchClearBtn.classList.add('hidden');
      this.render();
    });

    // Quick Composer
    this.quickAddForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.quickTaskTitle.value.trim();
      if (!title) return;

      this.repo.add({
        title,
        priority: this.quickTaskPriority.value,
        category: this.quickTaskCategory.value,
        dueDate: this.quickTaskDate.value,
        status: 'todo',
        subtasks: []
      });

      this.quickTaskTitle.value = '';
      this.sound.playPop();
      this.showToast('✓ Task added successfully', 'success');
      this.render();
    });

    // Modal Trigger Buttons
    this.btnQuickNewTask?.addEventListener('click', () => this.openTaskModal());
    this.btnOpenAdvancedModal?.addEventListener('click', () => {
      this.openTaskModal({
        title: this.quickTaskTitle.value,
        priority: this.quickTaskPriority.value,
        category: this.quickTaskCategory.value,
        dueDate: this.quickTaskDate.value
      });
    });
    this.btnEmptyAddTask?.addEventListener('click', () => {
      const action = this.btnEmptyAddTask.dataset.emptyAction || 'create';
      if (action === 'clear_search') {
        if (this.searchInput) this.searchInput.value = '';
        this.currentSearchQuery = '';
        this.searchClearBtn?.classList.add('hidden');
        this.render();
      } else if (action === 'reset_filters') {
        this.currentStatusFilter = 'all';
        this.currentCategoryFilter = 'all';
        this.syncFilterControlsUI();
        this.render();
      } else {
        this.openTaskModal();
      }
    });
    this.btnKanbanAddTask?.addEventListener('click', () => this.openTaskModal());

    // Task Modal Handlers
    this.modalCloseBtn?.addEventListener('click', () => this.closeTaskModal());
    this.modalBtnCancel?.addEventListener('click', () => this.closeTaskModal());

    // LANGKAH 9 — Delete confirmation listeners
    this.confirmDeleteModal?.querySelector('#confirm-delete-cancel')?.addEventListener('click', () => this.closeDeleteConfirm());
    this.confirmDeleteModal?.querySelector('#confirm-delete-accept')?.addEventListener('click', () => this.confirmDelete());
    this.confirmDeleteModal?.addEventListener('click', (e) => {
      if (e.target === this.confirmDeleteModal) this.closeDeleteConfirm();
    });
    this.taskModal?.addEventListener('click', (e) => {
      if (e.target === this.taskModal) this.closeTaskModal();
    });
    this.categoryModal?.addEventListener('click', (e) => {
      if (e.target === this.categoryModal) this.closeCategoryModal();
    });
    this.settingsModal?.addEventListener('click', (e) => {
      if (e.target === this.settingsModal) this.closeSettingsModal();
    });
    this.shortcutsModal?.addEventListener('click', (e) => {
      if (e.target === this.shortcutsModal) this.closeShortcutsModal();
    });
    this.taskModalForm?.addEventListener('submit', (e) => this.handleSaveTaskModal(e));
    this.modalBtnDelete?.addEventListener('click', () => this.handleDeleteModalTask());

    // Subtasks In Modal
    this.btnAddSubtask?.addEventListener('click', () => this.handleAddSubtask());
    this.modalNewSubtaskInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAddSubtask();
      }
    });

    // Clear validation state on input
    this.modalTaskTitle?.addEventListener('input', () => {
      this.modalTaskTitle.removeAttribute('aria-invalid');
    });

    // Category Modal Handlers
    this.btnAddCategory?.addEventListener('click', () => this.openCategoryModal());
    this.categoryModalClose?.addEventListener('click', () => this.closeCategoryModal());
    this.categoryModalCancel?.addEventListener('click', () => this.closeCategoryModal());
    this.categoryModalForm?.addEventListener('submit', (e) => this.handleCreateCategory(e));

    // Shortcuts Modal
    this.shortcutsModalClose?.addEventListener('click', () => this.closeShortcutsModal());

    // Settings Modal Tabs & Handlers
    document.querySelectorAll('.settings-tab-btn[data-settings-tab]').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const tabKey = tabBtn.dataset.settingsTab;
        document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.settings-pane').forEach(p => p.classList.remove('active'));
        tabBtn.classList.add('active');
        document.getElementById(`settings-pane-${tabKey}`)?.classList.add('active');
      });
    });

    this.settingsModalClose?.addEventListener('click', () => this.closeSettingsModal());
    this.settingsModalSave?.addEventListener('click', () => {
      if (this.settingsInputName && this.settingsInputName.value.trim()) {
        this.userName = this.settingsInputName.value.trim();
        localStorage.setItem('taskflow_user_name', this.userName);
      }
      const greetingSelect = document.getElementById('settings-greeting-style');
      if (greetingSelect) {
        this.greetingStyle = greetingSelect.value;
        localStorage.setItem('taskflow_greeting_style', this.greetingStyle);
      }
      this.updateGreeting();
      this.updateUserProfileDisplay();
      this.closeSettingsModal();
      this.showToast('Preferences updated', 'success');
    });

    this.btnSettingsTheme?.addEventListener('click', () => this.toggleTheme());
    this.btnSettingsSound?.addEventListener('click', () => {
      const state = this.sound.toggle();
      this.updateSoundIcon();
      this.updateSettingsSoundUI();
    });

    this.settingsConfettiToggle?.addEventListener('change', (e) => {
      this.confettiEnabled = e.target.checked;
      localStorage.setItem('taskflow_confetti', this.confettiEnabled);
      this.pomodoro.confettiEnabled = this.confettiEnabled;
    });

    this.btnSettingsExport?.addEventListener('click', () => this.exportData());
    this.settingsImportFile?.addEventListener('change', (e) => this.importData(e));
    this.btnSettingsSample?.addEventListener('click', () => {
      this.repo.resetToDefault();
      this.closeSettingsModal();
      this.showToast('Sample data reloaded', 'info');
      this.render();
    });
    this.btnSettingsClearDone?.addEventListener('click', () => {
      this.repo.clearCompleted();
      this.closeSettingsModal();
      this.showToast('Completed tasks cleared', 'info');
      this.render();
    });
    this.btnSettingsResetAll?.addEventListener('click', () => {
      if (confirm('Are you sure you want to completely wipe all TaskFlow data?')) {
        this.repo.tasks = [];
        this.repo.save();
        this.closeSettingsModal();
        this.showToast('All tasks cleared', 'danger');
        this.render();
      }
    });

    // Bulk Mode Controls
    this.btnToggleBulkMode?.addEventListener('click', () => this.toggleBulkMode());
    this.btnBulkCancel?.addEventListener('click', () => this.toggleBulkMode(false));
    this.btnBulkComplete?.addEventListener('click', () => this.handleBulkComplete());
    this.btnBulkPriority?.addEventListener('click', () => this.handleBulkPriority());
    this.btnBulkDelete?.addEventListener('click', () => this.handleBulkDelete());

    // Pomodoro Controls
    this.btnTimerToggle?.addEventListener('click', () => this.pomodoro.toggle());
    this.btnTimerReset?.addEventListener('click', () => this.pomodoro.reset());
    
    document.querySelectorAll('.focus-segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.focus-segment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pomodoro.setMode(btn.dataset.timerType);
      });
    });

    this.focusTaskSelect?.addEventListener('change', (e) => {
      const hasTask = !!e.target.value;
      this.btnFocusCompleteTask?.classList.toggle('hidden', !hasTask);
    });

    this.btnFocusCompleteTask?.addEventListener('click', () => {
      const taskId = this.focusTaskSelect.value;
      if (taskId) {
        this.repo.update(taskId, { status: 'completed' });
        this.sound.playComplete();
        this.showToast('Active task marked as completed! 🎯', 'success');
        if (this.confettiEnabled && window.confetti) window.confetti({ particleCount: 75, spread: 60 });
        this.render();
      }
    });

    // Kanban Drag & Drop
    this.initKanbanDragEvents();

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl?.tagName);

      if (e.key === 'Escape') {
        this.closeTaskModal();
        this.closeCategoryModal();
        this.closeSettingsModal();
        this.closeShortcutsModal();
        this.closeDeleteConfirm();
        this.notificationDropdown?.classList.remove('show');
        this.profileDropdown?.classList.remove('show');
        this.notificationBtn?.setAttribute('aria-expanded', 'false');
        this.profileMenuBtn?.setAttribute('aria-expanded', 'false');
        if (this.isBulkMode) this.toggleBulkMode(false);
        return;
      }

      if (!isInput && !this._activeModal) {
        if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          this.openTaskModal();
        } else if (e.key === '/') {
          e.preventDefault();
          this.searchInput.focus();
        } else if (e.key === '1') {
          this.navigate('dashboard');
        } else if (e.key === '2') {
          this.navigate('all');
        } else if (e.key === '3') {
          this.navigate('kanban');
        } else if (e.key === '4') {
          this.navigate('focus');
        } else if (e.key === 't' || e.key === 'T') {
          this.toggleTheme();
        } else if (e.key === '?') {
          this.openShortcutsModal();
        }
      }
    });
  }

  // --- GREETING ENGINE ---
  updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    let icon = '👋';

    if (this.greetingStyle === 'formal') {
      greeting = 'Welcome back';
    } else if (this.greetingStyle === 'minimal') {
      greeting = 'Hey';
    } else {
      // dynamic (default)
      if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
        icon = '☀️';
      } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
        icon = '🌤️';
      } else {
        greeting = 'Good Evening';
      }
    }

    const fullGreeting = `${greeting}, ${this.userName} ${icon}`;
    if (this.headerGreetingText) {
      this.headerGreetingText.textContent = fullGreeting;
    }

    // Dashboard hero title (fixed greeting, dynamic username)
    const dashHeroTitle = document.getElementById('dashboard-hero-title');
    if (dashHeroTitle) {
      dashHeroTitle.textContent = `Welcome back, ${this.userName}! ${icon}`;
    }

    // Live Date Subtitle
    const now = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'short' };
    const dateFormatted = now.toLocaleDateString('en-US', dateOptions);
    if (this.headerGreetingSub) {
      this.headerGreetingSub.textContent = `Today is ${dateFormatted} • Keep up the momentum!`;
    }
  }

  updateUserProfileDisplay() {
    const initial = this.userName ? this.userName.charAt(0).toUpperCase() : 'U';

    // Primary: target by ID (most reliable)
    const headerAvatar = document.getElementById('header-avatar-initial');
    if (headerAvatar) headerAvatar.textContent = initial;
    const settingsAvatar = document.getElementById('settings-avatar-initial');
    if (settingsAvatar) settingsAvatar.textContent = initial;

    // Fallback: target by class (catches any other avatar instances)
    document.querySelectorAll('.avatar-initials').forEach(el => el.textContent = initial);
    document.querySelectorAll('.avatar-initials-lg').forEach(el => el.textContent = initial);

    document.querySelectorAll('.profile-name, .profile-full-name').forEach(el => el.textContent = this.userName);
    const settingsUserName = document.getElementById('settings-user-name-display');
    if (settingsUserName) settingsUserName.textContent = this.userName;
    const profileBtn = document.getElementById('profile-menu-btn');
    if (profileBtn) {
      profileBtn.setAttribute('title', `${this.userName}'s Account`);
    }
    const signOutBtn = document.getElementById('profile-btn-logout');
    if (signOutBtn) {
      const span = signOutBtn.querySelector('span');
      if (span) span.textContent = `Sign Out (${this.userName})`;
    }
  }

  // --- CENTRAL NAVIGATION & ACTIVE STATE HANDLER ---
  navigate(target, categoryId = null) {
    this.currentNav = target;

    // Reset active class on all sidebar nav buttons and category pills
    document.querySelectorAll('.sidebar-scrollable .nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.nav === target);
    });
    document.querySelectorAll('.category-nav-item').forEach(item => {
      item.classList.toggle('active', target === 'category' && item.dataset.categoryId === categoryId);
    });

    // Update Segmented Header View buttons
    document.querySelectorAll('.segment-btn').forEach(btn => {
      const v = btn.dataset.viewTarget;
      btn.classList.toggle('active', (target === 'all' && v === 'list') || target === v);
    });

    if (target === 'dashboard') {
      this.currentView = 'dashboard';
      this.showPane('view-dashboard-container');
    } else if (target === 'all') {
      this.currentView = 'list';
      this.currentStatusFilter = 'all';
      this.currentCategoryFilter = 'all';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'today') {
      this.currentView = 'list';
      this.currentStatusFilter = 'today';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'upcoming') {
      this.currentView = 'list';
      this.currentStatusFilter = 'upcoming';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'completed') {
      this.currentView = 'list';
      this.currentStatusFilter = 'completed';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'pending') {
      this.currentView = 'list';
      this.currentStatusFilter = 'active';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'overdue') {
      this.currentView = 'list';
      this.currentStatusFilter = 'overdue';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'kanban') {
      this.currentView = 'kanban';
      this.showPane('view-kanban-container');
    } else if (target === 'focus') {
      this.currentView = 'focus';
      this.showPane('view-focus-container');
    } else if (target === 'category') {
      this.currentView = 'list';
      this.currentCategoryFilter = categoryId || 'all';
      this.syncFilterControlsUI();
      this.showPane('view-list-container');
    } else if (target === 'settings') {
      this.openSettingsModal();
      return;
    }

    this.render();
  }

  syncFilterControlsUI() {
    // 1. Sync filter tabs
    document.querySelectorAll('.filter-tab-btn[data-status-filter]').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.statusFilter === this.currentStatusFilter);
    });

    // 2. Sync category dropdown
    if (this.filterCategorySelect) {
      this.filterCategorySelect.value = this.currentCategoryFilter || 'all';
    }

    // 3. Sync sort dropdown
    if (this.sortTasksSelect) {
      this.sortTasksSelect.value = this.currentSort || 'newest';
    }
  }

  showPane(activePaneId) {
    const panes = [
      this.viewDashboardContainer,
      this.viewListContainer,
      this.viewKanbanContainer,
      this.viewFocusContainer
    ];
    panes.forEach(pane => {
      if (pane) {
        pane.classList.toggle('active', pane.id === activePaneId);
      }
    });
  }

  // --- THEME ---
  initTheme() {
    const savedTheme = localStorage.getItem('taskflow_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('taskflow_theme', nextTheme);
    this.updateThemeIcon(nextTheme);
    this.showToast(nextTheme === 'dark' ? '🌙 Switched to Dark Mode' : '☀️ Switched to Light Mode', 'info');
  }

  updateThemeIcon(theme) {
    if (this.themeIcon) {
      this.themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
    }
    if (this.settingsThemeIcon && this.settingsThemeText) {
      this.settingsThemeIcon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
      this.settingsThemeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  updateSoundIcon() {
    if (this.soundToggleBtn) {
      const icon = this.soundToggleBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', this.sound.enabled ? 'volume-2' : 'volume-x');
      }
    }
    this.updateSettingsSoundUI();
    if (window.lucide) window.lucide.createIcons();
  }

  updateSettingsSoundUI() {
    if (this.settingsSoundIcon && this.settingsSoundText) {
      this.settingsSoundIcon.setAttribute('data-lucide', this.sound.enabled ? 'volume-2' : 'volume-x');
      this.settingsSoundText.textContent = this.sound.enabled ? 'Enabled' : 'Muted';
    }
  }

  // --- NOTIFICATION CENTER ---
  generateSampleNotifications() {
    return [
      { id: 'notif-1', title: 'Task Due Today', message: 'Build Interactive Kanban Workflow Board is due today.', time: '10m ago', unread: true },
      { id: 'notif-2', title: 'Deep Focus Milestone', message: 'You completed your 25-minute Pomodoro session!', time: '1h ago', unread: true },
      { id: 'notif-3', title: 'Welcome to TaskFlow', message: 'Workspace loaded with sample productivity items.', time: '2h ago', unread: true }
    ];
  }

  saveNotificationReadState() {
    try {
      const state = {};
      this.notifications.forEach(n => { state[n.id] = n.unread; });
      localStorage.setItem(NOTIFICATION_READ_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving notification state:', e);
    }
  }

  loadNotificationReadState() {
    try {
      const saved = localStorage.getItem(NOTIFICATION_READ_KEY);
      if (!saved) return;
      const state = JSON.parse(saved);
      this.notifications.forEach(n => {
        if (state.hasOwnProperty(n.id)) {
          n.unread = state[n.id];
        }
      });
    } catch (e) {
      console.error('Error loading notification state:', e);
    }
  }

  renderNotifications() {
    if (!this.notificationList) return;

    const unreadCount = this.notifications.filter(n => n.unread).length;
    if (this.notifCountBadge) {
      this.notifCountBadge.textContent = `${unreadCount} new`;
    }
    if (this.notificationBadge) {
      this.notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    if (this.notifications.length === 0) {
      this.notificationList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No new notifications</div>`;
      return;
    }

    this.notificationList.innerHTML = this.notifications.map(n => `
      <div class="notification-item ${n.unread ? 'unread' : ''}" data-notif-id="${n.id}">
        <div class="notif-icon">
          <i data-lucide="${n.title.includes('Due') ? 'clock' : n.title.includes('Focus') ? 'zap' : 'sparkles'}"></i>
        </div>
        <div class="notif-content">
          <div class="notif-msg">${this.escapeHTML(n.message)}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      </div>
    `).join('');

    this.notificationList.querySelectorAll('.notification-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.notifId;
        const notif = this.notifications.find(n => n.id === id);
        if (notif) notif.unread = false;
        this.saveNotificationReadState();
        this.renderNotifications();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  markAllNotificationsRead() {
    this.notifications.forEach(n => n.unread = false);
    this.saveNotificationReadState();
    this.renderNotifications();
    this.showToast('All notifications marked as read', 'info');
  }

  // --- ACCESSIBILITY: MODAL FOCUS MANAGEMENT (REUSABLE) ---
  _openModal(modalEl, focusTarget) {
    if (!modalEl) return;
    if (this._pendingCloseTimeout) {
      clearTimeout(this._pendingCloseTimeout);
      this._pendingCloseTimeout = null;
    }
    this._modalTrigger = document.activeElement;
    this._activeModal = modalEl;
    modalEl.setAttribute('aria-hidden', 'false');
    modalEl.classList.remove('hidden', 'hiding');
    document.addEventListener('keydown', this._handleFocusTrap);
    if (focusTarget) {
      setTimeout(() => focusTarget.focus(), 50);
    }
  }

  _closeModal(modalEl) {
    if (!modalEl) return;
    document.removeEventListener('keydown', this._handleFocusTrap);
    this._activeModal = null;
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.classList.add('hiding');
    const trigger = this._modalTrigger;
    this._pendingCloseTimeout = setTimeout(() => {
      this._pendingCloseTimeout = null;
      modalEl.classList.remove('hiding');
      modalEl.classList.add('hidden');
      if (trigger && document.body.contains(trigger)) {
        trigger.focus();
      }
      this._modalTrigger = null;
    }, 150);
  }

  _handleFocusTrap(e) {
    if (!this._activeModal || e.key !== 'Tab') return;
    const container = this._activeModal.querySelector('.modal-container');
    if (!container) return;
    const focusable = container.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // --- SETTINGS MODAL ---
  openSettingsModal() {
    if (this.settingsInputName) {
      this.settingsInputName.value = this.userName;
    }
    const greetingSelect = document.getElementById('settings-greeting-style');
    if (greetingSelect) {
      greetingSelect.value = this.greetingStyle;
    }
    this.updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'dark');
    this.updateSettingsSoundUI();
    if (this.settingsConfettiToggle) {
      this.settingsConfettiToggle.checked = this.confettiEnabled;
    }
    this._openModal(this.settingsModal, this.settingsModalClose);
    if (window.lucide) window.lucide.createIcons();
  }

  closeSettingsModal() {
    this._closeModal(this.settingsModal);
  }

  openShortcutsModal() {
    this._openModal(this.shortcutsModal, this.shortcutsModalClose);
  }

  closeShortcutsModal() {
    this._closeModal(this.shortcutsModal);
  }

  // --- QUERYING, FILTERING & SORTING (LANGKAH 11 & 12) ---
  getFilteredTasks() {
    // 1. Ambil salinan array tugas (tidak memutasi array asli)
    const allTasks = this.repo.getAll();
    const todayStr = new Date().toISOString().split('T')[0];

    // Helper functions
    const isCompleted = (t) => t.status === 'completed';
    const isActive = (t) => t.status !== 'completed';
    const isToday = (t) => t.dueDate === todayStr;
    const isUpcoming = (t) => t.dueDate && t.dueDate > todayStr && t.status !== 'completed';
    const isOverdue = (t) => t.dueDate && t.dueDate < todayStr && t.status !== 'completed';

    // 2. Filter Status / Waktu (LANGKAH 11: All, Active, Completed, Today, Upcoming, Overdue)
    let filtered = allTasks.filter(task => {
      switch (this.currentStatusFilter) {
        case 'active':
          return isActive(task);
        case 'completed':
          return isCompleted(task);
        case 'today':
          return isToday(task);
        case 'upcoming':
          return isUpcoming(task);
        case 'overdue':
          return isOverdue(task);
        case 'all':
        default:
          return true;
      }
    });

    // 3. Filter Category (LANGKAH 11: All, Personal, Work, Study, Coding, Shopping, Other)
    if (this.currentCategoryFilter && this.currentCategoryFilter !== 'all') {
      const targetCat = this.currentCategoryFilter.toLowerCase().trim();
      filtered = filtered.filter(task => {
        const catObj = this.repo.getCategoryById(task.category);
        const catId = (task.category || '').toLowerCase().trim();
        const catName = (catObj ? catObj.name : '').toLowerCase().trim();
        return catId === targetCat || 
               catName === targetCat || 
               catId === `cat-${targetCat}` ||
               `cat-${catName}` === targetCat;
      });
    }

    // 4. Filter Search (bekerja bersama filter status & category)
    if (this.currentSearchQuery) {
      const q = this.currentSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(task => {
        const catObj = this.repo.getCategoryById(task.category);
        const titleMatch = (task.title || '').toLowerCase().includes(q);
        const descMatch = (task.description || '').toLowerCase().includes(q);
        const catMatch = catObj ? catObj.name.toLowerCase().includes(q) : false;
        const subtasksMatch = Array.isArray(task.subtasks) &&
          task.subtasks.some(s => (s.text || '').toLowerCase().includes(q));

        return titleMatch || descMatch || catMatch || subtasksMatch;
      });
    }

    // 5. Sorting (LANGKAH 12: Newest, Oldest, Priority High → Low, Priority Low → High, Deadline nearest, Deadline latest)
    // Menggunakan salinan array yang sudah difilter (tidak mengubah data asli)
    const sorted = [...filtered].sort((a, b) => {
      switch (this.currentSort) {
        case 'newest':
        case 'created_desc':
          return (b.createdAt || 0) - (a.createdAt || 0);

        case 'oldest':
        case 'created_asc':
          return (a.createdAt || 0) - (b.createdAt || 0);

        case 'priority_desc': {
          const weight = { urgent: 4, high: 3, medium: 2, low: 1 };
          const diff = (weight[b.priority] || 0) - (weight[a.priority] || 0);
          return diff !== 0 ? diff : (b.createdAt || 0) - (a.createdAt || 0);
        }

        case 'priority_asc': {
          const weight = { urgent: 4, high: 3, medium: 2, low: 1 };
          const diff = (weight[a.priority] || 0) - (weight[b.priority] || 0);
          return diff !== 0 ? diff : (b.createdAt || 0) - (a.createdAt || 0);
        }

        case 'due_asc': // Deadline nearest
          if (!a.dueDate && !b.dueDate) return (b.createdAt || 0) - (a.createdAt || 0);
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          if (a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
          if (a.dueTime && b.dueTime) return a.dueTime.localeCompare(b.dueTime);
          if (a.dueTime) return -1;
          if (b.dueTime) return 1;
          return 0;

        case 'due_desc': // Deadline latest
          if (!a.dueDate && !b.dueDate) return (b.createdAt || 0) - (a.createdAt || 0);
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          if (a.dueDate !== b.dueDate) return b.dueDate.localeCompare(a.dueDate);
          if (a.dueTime && b.dueTime) return b.dueTime.localeCompare(a.dueTime);
          if (a.dueTime) return 1;
          if (b.dueTime) return -1;
          return 0;

        case 'alphabetical':
          return (a.title || '').localeCompare(b.title || '');

        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });

    return sorted;
  }

  // --- RENDER ENGINE ---
  render() {
    this.renderSidebarCountsAndCategories();
    this.renderStats();
    this.renderPopulateSelects();
    
    if (this.currentView === 'dashboard') {
      this.renderDashboard();
    } else if (this.currentView === 'list') {
      this.renderTaskList();
    } else if (this.currentView === 'kanban') {
      this.renderKanbanBoard();
    } else if (this.currentView === 'focus') {
      this.renderFocusView();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderPopulateSelects() {
    const categories = this.repo.getCategories();
    
    // Filter Category Select Dropdown (LANGKAH 11)
    if (this.filterCategorySelect) {
      const cur = this.currentCategoryFilter || 'all';
      this.filterCategorySelect.innerHTML = `<option value="all">Category: All</option>` +
        categories.map(c => 
          `<option value="${c.id}">${this.escapeHTML(c.name)}</option>`
        ).join('');
      this.filterCategorySelect.value = cur;
    }

    if (this.quickTaskCategory) {
      const cur = this.quickTaskCategory.value;
      this.quickTaskCategory.innerHTML = categories.map(c => 
        `<option value="${c.id}">${this.escapeHTML(c.name)}</option>`
      ).join('');
      if (cur) this.quickTaskCategory.value = cur;
    }

    if (this.modalTaskCategory) {
      const cur = this.modalTaskCategory.value;
      this.modalTaskCategory.innerHTML = categories.map(c => 
        `<option value="${c.id}">${this.escapeHTML(c.name)}</option>`
      ).join('');
      if (cur) this.modalTaskCategory.value = cur;
    }

    if (this.focusTaskSelect) {
      const pendingTasks = this.repo.getAll().filter(t => t.status !== 'completed');
      const cur = this.focusTaskSelect.value;
      this.focusTaskSelect.innerHTML = `<option value="">Select a task to focus on...</option>` +
        pendingTasks.map(t => `<option value="${t.id}">${this.escapeHTML(t.title)}</option>`).join('');
      if (cur && pendingTasks.some(t => t.id === cur)) {
        this.focusTaskSelect.value = cur;
      }
    }
  }

  renderSidebarCountsAndCategories() {
    const all = this.repo.getAll();
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = (t) => t.status !== 'completed' && t.dueDate && t.dueDate < todayStr;

    const todayCount = all.filter(t => t.dueDate === todayStr).length;
    const upcomingCount = all.filter(t => t.dueDate && t.dueDate > todayStr && t.status !== 'completed').length;
    const completedCount = all.filter(t => t.status === 'completed').length;
    const overdueCount = all.filter(isOverdue).length;

    if (document.getElementById('nav-count-all')) document.getElementById('nav-count-all').textContent = all.length;
    if (document.getElementById('nav-count-today')) document.getElementById('nav-count-today').textContent = todayCount;
    if (document.getElementById('nav-count-upcoming')) document.getElementById('nav-count-upcoming').textContent = upcomingCount;
    if (document.getElementById('nav-count-completed')) document.getElementById('nav-count-completed').textContent = completedCount;
    if (document.getElementById('nav-count-overdue')) document.getElementById('nav-count-overdue').textContent = overdueCount;

    const categories = this.repo.getCategories();
    if (this.categoriesList) {
      this.categoriesList.innerHTML = categories.map(cat => {
        const catCount = all.filter(t => t.category === cat.id).length;
        const isActive = this.currentCategoryFilter === cat.id;
        return `
          <div class="category-nav-item ${isActive ? 'active' : ''}" data-category-id="${cat.id}">
            <span class="category-dot" style="--cat-color: ${cat.color};"></span>
            <span>${this.escapeHTML(cat.name)}</span>
            <span class="nav-counter">${catCount}</span>
          </div>
        `;
      }).join('');

      this.categoriesList.querySelectorAll('.category-nav-item').forEach(item => {
        item.addEventListener('click', () => {
          this.navigate('category', item.dataset.categoryId);
        });
      });
    }
  }

  renderDashboard() {
    const all = this.repo.getAll();
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = (t) => t.status !== 'completed' && t.dueDate && t.dueDate < todayStr;
    const isPending = (t) => t.status !== 'completed' && (!t.dueDate || t.dueDate >= todayStr);

    const total = all.length;
    const completed = all.filter(t => t.status === 'completed').length;
    const pending = all.filter(isPending).length;
    const overdue = all.filter(isOverdue).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const todayTasks = all.filter(t => t.dueDate === todayStr || (t.priority === 'urgent' && t.status !== 'completed'));

    if (this.dashDueCount) this.dashDueCount.textContent = `${todayTasks.filter(t => t.status !== 'completed').length} tasks`;
    if (this.dashTotalCount) this.dashTotalCount.textContent = total;
    if (this.dashCompletedCount) this.dashCompletedCount.textContent = completed;
    if (this.dashPendingCount) this.dashPendingCount.textContent = pending;
    if (this.dashOverdueCount) this.dashOverdueCount.textContent = overdue;

    // Today's Priority Tasks List
    if (this.dashTodayTasksList) {
      if (todayTasks.length === 0) {
        this.dashTodayTasksList.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            No urgent or scheduled tasks for today. Great job! 🎉
          </div>
        `;
      } else {
        this.dashTodayTasksList.innerHTML = todayTasks.slice(0, 5).map(task => {
          const isDone = task.status === 'completed';
          const cat = this.repo.getCategoryById(task.category);
          return `
            <div class="dash-task-item ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
              <div class="dash-task-check" role="checkbox" aria-checked="${isDone}" tabindex="0">
                <i data-lucide="check"></i>
              </div>
              <span class="dash-task-title">${this.escapeHTML(task.title)}</span>
              <div class="dash-task-meta">
                <span class="badge badge-priority-${task.priority}">${task.priority.toUpperCase()}</span>
                <span class="badge badge-category" style="color: ${cat.color};">${this.escapeHTML(cat.name)}</span>
              </div>
            </div>
          `;
        }).join('');

        this.dashTodayTasksList.querySelectorAll('.dash-task-check').forEach(chk => {
          chk.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = chk.closest('.dash-task-item');
            if (parent) {
              this.toggleTaskComplete(parent.dataset.taskId);
            }
          });
          chk.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
              const parent = chk.closest('.dash-task-item');
              if (parent) {
                this.toggleTaskComplete(parent.dataset.taskId);
              }
            }
          });
        });

        this.dashTodayTasksList.querySelectorAll('.dash-task-item').forEach(item => {
          item.addEventListener('click', () => {
            this.openTaskModal(this.repo.getById(item.dataset.taskId));
          });
        });
      }
    }

    // Categories Breakdown
    if (this.dashCategoriesBreakdown) {
      const cats = this.repo.getCategories();
      this.dashCategoriesBreakdown.innerHTML = cats.map(cat => {
        const catTasks = all.filter(t => t.category === cat.id);
        const catDone = catTasks.filter(t => t.status === 'completed').length;
        const catPercent = catTasks.length > 0 ? Math.round((catDone / catTasks.length) * 100) : 0;
        return `
          <div class="category-breakdown-row">
            <div class="cat-breakdown-meta">
              <span style="font-weight: 600; color: var(--text-primary);">${this.escapeHTML(cat.name)}</span>
              <span>${catDone}/${catTasks.length} done (${catPercent}%)</span>
            </div>
            <div class="cat-progress-track">
              <div class="cat-progress-bar" style="width: ${catPercent}%; background-color: ${cat.color};"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  renderStats() {
    const all = this.repo.getAll();
    const todayStr = new Date().toISOString().split('T')[0];
    const isOverdue = (t) => t.status !== 'completed' && t.dueDate && t.dueDate < todayStr;
    const isPending = (t) => t.status !== 'completed' && (!t.dueDate || t.dueDate >= todayStr);

    const total = all.length;
    const completed = all.filter(t => t.status === 'completed').length;
    const pending = all.filter(isPending).length;
    const overdue = all.filter(isOverdue).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (this.statTotalCount) this.statTotalCount.textContent = total;
    if (this.statCompletedCount) this.statCompletedCount.textContent = completed;
    if (this.statPendingCount) this.statPendingCount.textContent = pending;
    if (this.statOverdueCount) this.statOverdueCount.textContent = overdue;

    if (this.sidebarProgressFill) this.sidebarProgressFill.style.width = `${rate}%`;
    if (this.sidebarCompletedText) this.sidebarCompletedText.textContent = `${completed} of ${total} tasks done`;
    if (this.sidebarPercentText) this.sidebarPercentText.textContent = `${rate}%`;

    // LANGKAH 5 — Your Productivity (realtime update)
    if (this.yourProdPercent) this.yourProdPercent.textContent = `${rate}% completed`;
    if (this.yourProdFill) this.yourProdFill.style.width = `${rate}%`;
    if (this.yourProdSubtext) this.yourProdSubtext.textContent = `${completed} of ${total} tasks done (${completed} / ${total} × 100)`;

    let filterTitle = 'All Tasks';
    let filterDesc = 'Focus on high-impact work, track milestones, and streamline your workflow.';
    if (this.currentStatusFilter === 'today') {
      filterTitle = "Today's Focus";
      filterDesc = 'Tasks scheduled for today. Complete high-priority items first.';
    } else if (this.currentStatusFilter === 'upcoming') {
      filterTitle = 'Upcoming Tasks';
      filterDesc = 'Scheduled tasks for tomorrow and future dates.';
    } else if (this.currentStatusFilter === 'completed') {
      filterTitle = 'Completed Archive';
      filterDesc = 'All completed tasks. Review finished milestones and progress.';
    } else if (this.currentStatusFilter === 'active') {
      filterTitle = 'Active Tasks';
      filterDesc = 'Active and in-progress tasks currently awaiting completion.';
    } else if (this.currentStatusFilter === 'overdue') {
      filterTitle = 'Overdue Tasks';
      filterDesc = 'Tasks past their scheduled deadline that need immediate attention.';
    }

    if (this.currentCategoryFilter && this.currentCategoryFilter !== 'all') {
      const cat = this.repo.getCategoryById(this.currentCategoryFilter);
      const catName = cat ? cat.name : this.currentCategoryFilter;
      filterTitle = `${catName} Tasks (${filterTitle})`;
      filterDesc = `Filtered view for ${catName} tasks.`;
    }

    if (this.currentSearchQuery) {
      filterTitle = `Search: "${this.currentSearchQuery}"`;
      filterDesc = `Showing tasks matching "${this.currentSearchQuery}".`;
    }

    if (this.currentViewHeading) this.currentViewHeading.textContent = filterTitle;
    if (this.currentViewDesc) this.currentViewDesc.textContent = filterDesc;
  }

  // --- RENDER LIST (LANGKAH 16: DYNAMIC EMPTY STATE) ---
  renderTaskList() {
    const tasks = this.getFilteredTasks();
    const allTasks = this.repo.getAll();

    if (tasks.length === 0) {
      this.tasksList.innerHTML = '';
      this.tasksEmptyState.classList.remove('hidden');

      const titleEl = document.getElementById('empty-state-title');
      const descEl = document.getElementById('empty-state-desc');
      const iconWrap = this.tasksEmptyState.querySelector('.empty-icon-glow');
      const btnEmpty = document.getElementById('btn-empty-add-task');

      let iconName = 'check-circle-2';
      let title = 'No tasks found';
      let desc = 'You are all caught up! 🎉';
      let btnLabel = 'Create Task';
      let btnAction = 'create';

      if (this.currentSearchQuery) {
        // Kasus 1: Search tidak menemukan task
        iconName = 'search-x';
        title = 'No tasks found';
        desc = `No tasks match your search for "${this.escapeHTML(this.currentSearchQuery)}". Try checking for typos or clear search.`;
        btnLabel = 'Clear Search';
        btnAction = 'clear_search';
      } else if (allTasks.length > 0 && allTasks.every(t => t.status === 'completed')) {
        // Kasus 2: Semua task selesai
        iconName = 'sparkles';
        title = 'You are all caught up! 🎉';
        desc = 'All tasks have been completed. Great job staying focused and productive today!';
        btnLabel = 'Create New Task';
        btnAction = 'create';
      } else if (this.currentStatusFilter !== 'all' || (this.currentCategoryFilter && this.currentCategoryFilter !== 'all')) {
        // Kasus 3: Filter tidak menemukan task
        iconName = 'inbox';
        title = 'No tasks found';
        if (this.currentStatusFilter === 'today') {
          desc = 'No tasks scheduled for today. You are all caught up! 🎉';
        } else if (this.currentStatusFilter === 'overdue') {
          desc = 'No overdue tasks found. Everything is on track! ✨';
        } else if (this.currentStatusFilter === 'upcoming') {
          desc = 'No upcoming tasks scheduled for future dates.';
        } else if (this.currentStatusFilter === 'completed') {
          desc = 'No completed tasks found in this view yet.';
        } else if (this.currentStatusFilter === 'active') {
          desc = 'No active tasks found. You are all caught up! 🎉';
        } else if (this.currentCategoryFilter && this.currentCategoryFilter !== 'all') {
          const cat = this.repo.getCategoryById(this.currentCategoryFilter);
          desc = `No tasks found in category "${cat ? cat.name : this.currentCategoryFilter}".`;
        } else {
          desc = 'No tasks match your current filter selection.';
        }
        btnLabel = 'Reset Filters';
        btnAction = 'reset_filters';
      } else if (allTasks.length === 0) {
        // Kasus 4: Workspace kosong
        iconName = 'check-circle-2';
        title = 'No tasks found';
        desc = 'You are all caught up! 🎉 Your task list is clean. Create a new task to get started.';
        btnLabel = 'Create Task';
        btnAction = 'create';
      }

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (iconWrap) iconWrap.innerHTML = `<i data-lucide="${iconName}"></i>`;
      if (btnEmpty) {
        btnEmpty.dataset.emptyAction = btnAction;
        btnEmpty.innerHTML = `
          <i data-lucide="${btnAction === 'clear_search' ? 'x' : btnAction === 'reset_filters' ? 'rotate-ccw' : 'plus'}"></i>
          <span>${btnLabel}</span>
        `;
      }

      if (window.lucide) window.lucide.createIcons();
      return;
    }

    this.tasksEmptyState.classList.add('hidden');
    this.tasksList.innerHTML = tasks.map(t => this.generateTaskItemHTML(t)).join('');

    this.tasksList.querySelectorAll('.task-item').forEach(el => {
      const id = el.dataset.taskId;
      
      el.querySelector('.custom-checkbox')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleTaskComplete(id);
      });
      el.querySelector('.custom-checkbox')?.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this.toggleTaskComplete(id);
        }
      });

      el.querySelector('.bulk-checkbox')?.addEventListener('change', (e) => {
        e.stopPropagation();
        if (e.target.checked) this.selectedTaskIds.add(id);
        else this.selectedTaskIds.delete(id);
        this.updateBulkBarUI();
      });

      el.querySelector('.task-content')?.addEventListener('click', () => {
        if (!this.isBulkMode) this.openTaskModal(this.repo.getById(id));
      });

      el.querySelector('.btn-task-edit')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openTaskModal(this.repo.getById(id));
      });

      el.querySelector('.btn-task-delete')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteTask(id);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  generateTaskItemHTML(task) {
    const category = this.repo.getCategoryById(task.category);
    const isDone = task.status === 'completed';
    const isSelected = this.selectedTaskIds.has(task.id);

    let dateBadgeHTML = '';
    if (task.dueDate) {
      const todayStr = new Date().toISOString().split('T')[0];
      let dateLabel = task.dueDate;
      let dateClass = '';

      if (task.dueDate === todayStr) {
        dateLabel = 'Today';
        dateClass = 'today';
      } else if (task.dueDate < todayStr && !isDone) {
        dateLabel = 'Overdue';
        dateClass = 'overdue';
      }
      const timeLabel = task.dueTime ? `, ${task.dueTime}` : '';
      dateBadgeHTML = `<span class="badge badge-date ${dateClass}"><i data-lucide="calendar"></i> ${dateLabel}${timeLabel}</span>`;
    }

    let subtaskSummaryHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
      const subDone = task.subtasks.filter(s => s.completed).length;
      const subTotal = task.subtasks.length;
      const subPercent = Math.round((subDone / subTotal) * 100);
      subtaskSummaryHTML = `
        <div class="subtasks-inline-progress">
          <div class="mini-progress-bar">
            <div class="mini-progress-fill" style="width: ${subPercent}%;"></div>
          </div>
          <span>${subDone}/${subTotal}</span>
        </div>
      `;
    }

    return `
      <div class="task-item priority-${task.priority} ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
        
        <div class="bulk-select-wrap">
          <input type="checkbox" class="bulk-checkbox" ${isSelected ? 'checked' : ''}>
        </div>

        <div class="task-checkbox-wrap">
          <div class="custom-checkbox" role="checkbox" aria-checked="${isDone}" tabindex="0">
            <i data-lucide="check"></i>
          </div>
        </div>

        <div class="task-content">
          <div class="task-header-row">
            <span class="task-title">${this.escapeHTML(task.title)}</span>
            
            <div class="task-badges-row">
              <span class="badge badge-priority-${task.priority}">
                ${task.priority.toUpperCase()}
              </span>
              <span class="badge badge-category" style="border-left: 2px solid ${category.color};">
                ${this.escapeHTML(category.name)}
              </span>
              ${dateBadgeHTML}
            </div>
          </div>

          ${task.description ? `<p class="task-desc">${this.escapeHTML(task.description)}</p>` : ''}
          ${subtaskSummaryHTML}
        </div>

        <div class="task-actions">
          <button class="icon-btn-minimal btn-task-edit" title="Edit Task" aria-label="Edit Task">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="icon-btn-minimal btn-task-delete" title="Delete Task" aria-label="Delete Task">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;
  }

  // --- RENDER KANBAN ---
  renderKanbanBoard() {
    const tasks = this.repo.getAll();

    const todoTasks = tasks.filter(t => t.status === 'todo');
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    if (this.kanbanCountTodo) this.kanbanCountTodo.textContent = todoTasks.length;
    if (this.kanbanCountInProgress) this.kanbanCountInProgress.textContent = inProgressTasks.length;
    if (this.kanbanCountCompleted) this.kanbanCountCompleted.textContent = completedTasks.length;

    if (this.kanbanCardsTodo) this.kanbanCardsTodo.innerHTML = todoTasks.map(t => this.generateKanbanCardHTML(t)).join('');
    if (this.kanbanCardsInProgress) this.kanbanCardsInProgress.innerHTML = inProgressTasks.map(t => this.generateKanbanCardHTML(t)).join('');
    if (this.kanbanCardsCompleted) this.kanbanCardsCompleted.innerHTML = completedTasks.map(t => this.generateKanbanCardHTML(t)).join('');

    document.querySelectorAll('.kanban-card').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.taskId);
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });

      card.addEventListener('click', (e) => {
        if (e.target.closest('.kanban-move-select')) return;
        this.openTaskModal(this.repo.getById(card.dataset.taskId));
      });
    });

    // Kanban move select (keyboard accessible alternative to drag/drop)
    document.querySelectorAll('.kanban-move-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const taskId = select.dataset.taskId;
        const newStatus = e.target.value;
        if (taskId && newStatus) {
          this.repo.update(taskId, { status: newStatus });
          this.sound.playPop();
          this.showToast(`Task moved to ${newStatus.replace('_', ' ')}`, 'info');
          this.render();
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  generateKanbanCardHTML(task) {
    const category = this.repo.getCategoryById(task.category);
    return `
      <div class="kanban-card priority-${task.priority}" draggable="true" data-task-id="${task.id}">
        <div class="task-badges-row">
          <span class="badge badge-priority-${task.priority}">${task.priority.toUpperCase()}</span>
          <span class="badge badge-category" style="color: ${category.color};">${this.escapeHTML(category.name)}</span>
        </div>
        <h4 class="kanban-card-title">${this.escapeHTML(task.title)}</h4>
        ${task.description ? `<p class="kanban-card-desc">${this.escapeHTML(task.description)}</p>` : ''}
        <div class="kanban-card-footer">
          <span class="badge badge-date"><i data-lucide="calendar"></i> ${task.dueDate || 'No Date'}</span>
          <select class="kanban-move-select" aria-label="Move ${this.escapeHTML(task.title)} to column" data-task-id="${task.id}">
            <option value="" disabled selected>Move…</option>
            <option value="todo" ${task.status === 'todo' ? 'disabled' : ''}>To Do</option>
            <option value="in_progress" ${task.status === 'in_progress' ? 'disabled' : ''}>In Progress</option>
            <option value="completed" ${task.status === 'completed' ? 'disabled' : ''}>Completed</option>
          </select>
        </div>
      </div>
    `;
  }

  initKanbanDragEvents() {
    const dropZones = [this.kanbanCardsTodo, this.kanbanCardsInProgress, this.kanbanCardsCompleted];
    dropZones.forEach(zone => {
      if (!zone) return;
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = zone.dataset.dropStatus;
        
        if (taskId && newStatus) {
          this.repo.update(taskId, { status: newStatus });
          this.sound.playPop();
    if (this.confettiEnabled && window.confetti) {
      window.confetti({ particleCount: 60, spread: 60 });
    }
          this.render();
        }
      });
    });
  }

  // --- RENDER FOCUS ---
  renderFocusView() {
    this.pomodoro.notifyTick();
  }

  renderTimerTick(state) {
    if (this.focusTimerDigits) {
      this.focusTimerDigits.textContent = state.formatted;
    }
    if (this.timerBtnText) {
      this.timerBtnText.textContent = state.isRunning ? 'Pause Focus' : 'Start Focus';
    }
    if (this.timerPlayIcon) {
      this.timerPlayIcon.setAttribute('data-lucide', state.isRunning ? 'pause' : 'play');
      if (window.lucide) window.lucide.createIcons();
    }
    if (this.focusTimerStatusText) {
      this.focusTimerStatusText.textContent = state.isRunning ? 'Deep focus in session' : 'Ready to start';
    }

    if (this.pomodoroProgressRing) {
      const circumference = 753.98;
      const offset = circumference - (state.progress * circumference);
      this.pomodoroProgressRing.style.strokeDashoffset = offset;
    }

    if (this.pomodoroCompletedCount) {
      this.pomodoroCompletedCount.textContent = state.sessionsCompleted;
    }
    if (this.focusMinutesCount) {
      this.focusMinutesCount.textContent = `${state.totalFocusMinutes}m`;
    }
  }

  handleTimerComplete(mode) {
    this.showToast(`Pomodoro session finished! Great job!`, 'success');
  }

  // --- ACTION ---
  toggleTaskComplete(id) {
    const task = this.repo.getById(id);
    if (!task) return;

    const isCompleting = task.status !== 'completed';
    const nextStatus = isCompleting ? 'completed' : (task._preCompletionStatus || 'todo');
    const taskEl = document.querySelector(`.task-item[data-task-id="${id}"]`);

    if (taskEl && nextStatus === 'completed') {
      // Add completion animation
      taskEl.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      taskEl.style.opacity = '0.6';
      taskEl.style.transform = 'scale(0.98)';

      setTimeout(() => {
        this.repo.update(id, { status: nextStatus, _preCompletionStatus: task.status });
        this.sound.playComplete();
        if (this.confettiEnabled && window.confetti) {
          window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        }
        this.showToast('✓ Task completed', 'success');
        this.render();
      }, 150);
    } else if (taskEl && nextStatus === 'todo') {
      // Add uncomplete animation
      taskEl.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      taskEl.style.transform = 'scale(1.02)';

      setTimeout(() => {
        this.repo.update(id, { status: nextStatus, _preCompletionStatus: null });
        this.sound.playPop();
        this.showToast('Task marked as in progress', 'info');
        this.render();
      }, 100);
    } else {
      this.repo.update(id, { status: nextStatus, _preCompletionStatus: isCompleting ? task.status : null });
      if (nextStatus === 'completed') {
        this.sound.playComplete();
        if (this.confettiEnabled && window.confetti) {
          window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
        }
        this.showToast('✓ Task completed', 'success');
      } else {
        this.sound.playPop();
        this.showToast('Task marked as in progress', 'info');
      }
      this.render();
    }
  }

  // --- LANGKAH 9: DELETE DENGAN CONFIRMATION MODAL ---
  deleteTask(id) {
    const task = this.repo.getById(id);
    if (!task) return;
    this.pendingDeleteId = id;
    if (this.confirmDeleteTaskTitle) this.confirmDeleteTaskTitle.textContent = task.title;
    this._openModal(this.confirmDeleteModal, this.confirmDeleteModal?.querySelector('#confirm-delete-cancel'));
  }

  closeDeleteConfirm() {
    this.pendingDeleteId = null;
    this._closeModal(this.confirmDeleteModal);
  }

  confirmDelete() {
    if (!this.pendingDeleteId) return;
    const id = this.pendingDeleteId;
    let deleted = false;
    const doDelete = () => {
      if (deleted) return;
      deleted = true;
      this.repo.delete(id);
      this.sound.playTrash();
      this.showToast('✓ Task deleted successfully', 'danger');
      this.render();
    };
    const taskEl = document.querySelector(`.task-item[data-task-id="${id}"]`);
    if (taskEl) {
      taskEl.classList.add('removing');
      taskEl.addEventListener('animationend', doDelete, { once: true });
      setTimeout(doDelete, 500);
    } else {
      doDelete();
    }
    this.closeDeleteConfirm();
  }

  // --- MODAL: CREATE / EDIT ---
  openTaskModal(task = null) {
    this.tempModalSubtasks = [];
    
    if (task && task.id) {
      document.getElementById('task-modal-title').textContent = 'Edit Task';
      const saveText = document.getElementById('modal-btn-save-text');
      if (saveText) saveText.textContent = 'Save Changes';
      this.modalTaskId.value = task.id;
      this.modalTaskTitle.value = task.title;
      this.modalTaskDesc.value = task.description || '';
      this.modalTaskPriority.value = task.priority;
      this.modalTaskCategory.value = task.category;
      this.modalTaskStatus.value = task.status;
      this.modalTaskDueDate.value = task.dueDate || '';
      this.modalTaskDueTime.value = task.dueTime || '';
      this.tempModalSubtasks = task.subtasks ? JSON.parse(JSON.stringify(task.subtasks)) : [];
      this.modalBtnDelete.classList.remove('hidden');
    } else {
      document.getElementById('task-modal-title').textContent = 'Create Task';
      const saveText = document.getElementById('modal-btn-save-text');
      if (saveText) saveText.textContent = 'Add Task';
      this.modalTaskId.value = '';
      this.modalTaskTitle.value = task?.title || '';
      this.modalTaskDesc.value = '';
      this.modalTaskPriority.value = task?.priority || 'medium';
      this.modalTaskCategory.value = task?.category || (this.repo.getCategories()[0]?.id || 'cat-personal');
      this.modalTaskStatus.value = 'todo';
      this.modalTaskDueDate.value = task?.dueDate || '';
      this.modalTaskDueTime.value = task?.dueTime || '';
      this.tempModalSubtasks = [];
      this.modalBtnDelete.classList.add('hidden');
    }

    this.renderModalSubtasks();
    this.modalTaskTitle.removeAttribute('aria-invalid');
    this._openModal(this.taskModal, this.modalTaskTitle);
  }

  closeTaskModal() {
    this._closeModal(this.taskModal);
  }

  handleSaveTaskModal(e) {
    e.preventDefault();
    const id = this.modalTaskId.value;
    const taskData = {
      title: this.modalTaskTitle.value.trim(),
      description: this.modalTaskDesc.value.trim(),
      priority: this.modalTaskPriority.value,
      category: this.modalTaskCategory.value,
      status: this.modalTaskStatus.value,
      dueDate: this.modalTaskDueDate.value,
      dueTime: this.modalTaskDueTime.value,
      subtasks: this.tempModalSubtasks
    };

    // --- VALIDASI DASAR ---
    if (!taskData.title) {
      this.modalTaskTitle.setAttribute('aria-invalid', 'true');
      this.showToast('Title is required', 'danger');
      this.modalTaskTitle.focus();
      return;
    }
    if (taskData.title.length > 120) {
      this.modalTaskTitle.setAttribute('aria-invalid', 'true');
      this.showToast('Title is too long (max 120 characters)', 'danger');
      return;
    }
    if (taskData.dueDate && taskData.dueTime) {
      const dt = new Date(`${taskData.dueDate}T${taskData.dueTime}`);
      if (isNaN(dt.getTime())) {
        this.showToast('Invalid date/time combination', 'danger');
        return;
      }
    }

    if (id) {
      this.repo.update(id, taskData);
      this.showToast('✓ Task updated successfully', 'success');
    } else {
      this.repo.add(taskData);
      this.showToast('✓ Task added successfully', 'success');
    }

    this.sound.playPop();
    this.closeTaskModal();
    this.render();
  }

  handleDeleteModalTask() {
    const id = this.modalTaskId.value;
    if (id) {
      this.closeTaskModal();
      setTimeout(() => this.deleteTask(id), 160);
    }
  }

  handleAddSubtask() {
    const text = this.modalNewSubtaskInput.value.trim();
    if (!text) return;

    this.tempModalSubtasks.push({
      id: 'sub_' + Date.now(),
      text,
      completed: false
    });

    this.modalNewSubtaskInput.value = '';
    this.renderModalSubtasks();
    this.modalNewSubtaskInput.focus();
  }

  renderModalSubtasks() {
    const total = this.tempModalSubtasks.length;
    const done = this.tempModalSubtasks.filter(s => s.completed).length;
    this.modalSubtasksProgress.textContent = `${done}/${total} completed`;

    this.modalSubtasksList.innerHTML = this.tempModalSubtasks.map((sub, idx) => `
      <div class="subtask-item-row ${sub.completed ? 'completed' : ''}">
        <input type="checkbox" ${sub.completed ? 'checked' : ''} data-sub-index="${idx}">
        <span>${this.escapeHTML(sub.text)}</span>
        <button type="button" class="icon-btn-minimal btn-del-sub" data-sub-index="${idx}">
          <i data-lucide="x"></i>
        </button>
      </div>
    `).join('');

    this.modalSubtasksList.querySelectorAll('input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.subIndex, 10);
        this.tempModalSubtasks[idx].completed = e.target.checked;
        this.renderModalSubtasks();
      });
    });

    this.modalSubtasksList.querySelectorAll('.btn-del-sub').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.subIndex, 10);
        this.tempModalSubtasks.splice(idx, 1);
        this.renderModalSubtasks();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- MODAL: CATEGORY ---
  openCategoryModal() {
    this.categoryNameInput.value = '';
    this._openModal(this.categoryModal, this.categoryNameInput);
  }

  closeCategoryModal() {
    this._closeModal(this.categoryModal);
  }

  handleCreateCategory(e) {
    e.preventDefault();
    const name = this.categoryNameInput.value.trim();
    const color = document.querySelector('input[name="cat-color"]:checked')?.value || '#6366f1';
    
    if (name) {
      this.repo.addCategory(name, color);
      this.sound.playPop();
      this.showToast(`Category "${name}" created`, 'success');
      this.closeCategoryModal();
      this.render();
    }
  }

  // --- BULK SELECTION ---
  toggleBulkMode(force = null) {
    this.isBulkMode = force !== null ? force : !this.isBulkMode;
    this.selectedTaskIds.clear();
    this.appLayout?.classList.toggle('bulk-mode', this.isBulkMode);
    this.bulkActionBar?.classList.toggle('hidden', !this.isBulkMode);
    this.updateBulkBarUI();
    this.renderTaskList();
  }

  updateBulkBarUI() {
    if (this.bulkSelectedCount) this.bulkSelectedCount.textContent = this.selectedTaskIds.size;
  }

  handleBulkComplete() {
    if (this.selectedTaskIds.size === 0) return;
    this.repo.updateStatusMultiple(Array.from(this.selectedTaskIds), 'completed');
    this.sound.playComplete();
    this.showToast(`Marked ${this.selectedTaskIds.size} tasks as done`, 'success');
    this.toggleBulkMode(false);
    this.render();
  }

  handleBulkPriority() {
    if (this.selectedTaskIds.size === 0) return;
    const prio = prompt('Enter new priority for selected items (urgent, high, medium, low):', 'high');
    if (prio && ['urgent', 'high', 'medium', 'low'].includes(prio.toLowerCase())) {
      this.selectedTaskIds.forEach(id => {
        this.repo.update(id, { priority: prio.toLowerCase() });
      });
      this.showToast(`Priority updated for ${this.selectedTaskIds.size} tasks`, 'info');
      this.toggleBulkMode(false);
      this.render();
    }
  }

  handleBulkDelete() {
    if (this.selectedTaskIds.size === 0) return;
    if (confirm(`Delete ${this.selectedTaskIds.size} selected tasks?`)) {
      const ids = Array.from(this.selectedTaskIds);
      // Add removing animation to each task
      ids.forEach(id => {
        const taskEl = document.querySelector(`.task-item[data-task-id="${id}"]`);
        if (taskEl) taskEl.classList.add('removing');
      });

      // Wait for animations to complete before deleting
      setTimeout(() => {
        this.repo.deleteMultiple(ids);
        this.sound.playTrash();
        this.showToast(`Deleted ${ids.length} tasks`, 'info');
        this.toggleBulkMode(false);
        this.render();
      }, 220);
    }
  }

  // --- EXPORT & IMPORT ---
  exportData() {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      tasks: this.repo.getAll(),
      categories: this.repo.getCategories()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Data exported as JSON', 'success');
  }

  importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);

        if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.tasks)) {
          this.showToast('Invalid TaskFlow JSON format', 'danger');
          return;
        }

        const validTasks = parsed.tasks.filter(t =>
          t && typeof t === 'object' && typeof t.id === 'string' && typeof t.title === 'string'
        );
        if (validTasks.length === 0 && parsed.tasks.length > 0) {
          this.showToast('No valid tasks found in import file', 'danger');
          return;
        }

        let validCategories = null;
        if (Array.isArray(parsed.categories)) {
          validCategories = parsed.categories.filter(c =>
            c && typeof c === 'object' && typeof c.id === 'string' && typeof c.name === 'string'
          );
        }

        this.repo.tasks = validTasks;
        if (validCategories !== null) {
          this.repo.categories = validCategories;
        }
        this.repo.save();
        this.showToast('Data imported successfully', 'success');
        this.render();
      } catch (err) {
        this.showToast('Failed to parse JSON file', 'danger');
      }
    };
    reader.readAsText(file);
  }

  // --- NOTIFICATIONS (LANGKAH 15: REUSABLE TOAST) ---
  showToast(message, type = 'info', duration = 3000) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle-2';
    else if (type === 'danger') iconName = 'alert-triangle';
    else if (type === 'warning') iconName = 'alert-circle';

    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <i data-lucide="${iconName}"></i>
      </div>
      <span class="toast-text">${this.escapeHTML(message)}</span>
      <button class="toast-close-btn" aria-label="Dismiss notification">
        <i data-lucide="x"></i>
      </button>
    `;

    let timerId = null;
    const dismiss = () => {
      if (timerId) clearTimeout(timerId);
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 260);
    };

    toast.querySelector('.toast-close-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      dismiss();
    });

    this.toastContainer.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    timerId = setTimeout(dismiss, duration);
  }

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// --- BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TaskFlowApp();
});
