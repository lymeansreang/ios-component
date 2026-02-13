"use client";

import { useState, useRef, useEffect } from "react";
import CodePreview from "@/components/ui/CodePreview";

/* ------------------------------------------------------------------ */
/*  Preview helpers                                                    */
/* ------------------------------------------------------------------ */

function DefaultDropdownPreview() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select an option");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = ["San Francisco", "New York", "London", "Tokyo"];

  return (
    <div ref={ref} className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
      >
        <span className={selected === "Select an option" ? "text-neutral-400" : ""}>{selected}</span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1.5 w-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                selected === opt
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              }`}
            >
              <span className="flex items-center justify-between">
                {opt}
                {selected === opt && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuDropdownPreview() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const actions = [
    { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", label: "Edit" },
    { icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z", label: "Duplicate" },
    { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", label: "Share" },
    { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16", label: "Delete", destructive: true },
  ];

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all"
      >
        Actions
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1.5 w-48 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {actions.map((action, i) => (
            <button
              key={action.label}
              onClick={() => setOpen(false)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                action.destructive
                  ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              } ${i === actions.length - 2 ? "border-b border-neutral-100 dark:border-neutral-800" : ""}`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
              </svg>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GroupedDropdownPreview() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Choose a fruit");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const groups = [
    { label: "Citrus", items: ["Orange", "Lemon", "Grapefruit"] },
    { label: "Berry", items: ["Strawberry", "Blueberry", "Raspberry"] },
  ];

  return (
    <div ref={ref} className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
      >
        <span className={selected === "Choose a fruit" ? "text-neutral-400" : ""}>{selected}</span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1.5 w-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {groups.map((group, gi) => (
            <div key={group.label}>
              {gi > 0 && <div className="border-t border-neutral-100 dark:border-neutral-800" />}
              <p className="px-4 pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {group.label}
              </p>
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => { setSelected(item); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    selected === item
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item}
                    {selected === item && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchableDropdownPreview() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select a country");
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "South Korea"];
  const filtered = countries.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={ref} className="relative w-64">
      <button
        onClick={() => { setOpen(!open); setQuery(""); }}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
      >
        <span className={selected === "Select a country" ? "text-neutral-400" : ""}>{selected}</span>
        <svg
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1.5 w-full rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="p-2 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-neutral-400 text-center">No results found</p>
            ) : (
              filtered.map((item) => (
                <button
                  key={item}
                  onClick={() => { setSelected(item); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selected === item
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item}
                    {selected === item && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style definitions                                                  */
/* ------------------------------------------------------------------ */

const dropdownStyles = [
  {
    title: "Default Dropdown",
    description: "Standard iOS-style picker with chevron indicator.",
    preview: <DefaultDropdownPreview />,
    swiftCode: `import UIKit

class DropdownView: UIView {

    private let button: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.plain()
        config.title = "Select an option"
        config.baseForegroundColor = .label
        config.image = UIImage(systemName: "chevron.down")
        config.imagePlacement = .trailing
        config.imagePadding = 8
        config.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 16, bottom: 10, trailing: 16)
        button.configuration = config
        button.layer.cornerRadius = 12
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor.separator.cgColor
        button.backgroundColor = .systemBackground
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let tableView: UITableView = {
        let tv = UITableView()
        tv.layer.cornerRadius = 12
        tv.layer.borderWidth = 1
        tv.layer.borderColor = UIColor.separator.cgColor
        tv.layer.shadowColor = UIColor.black.cgColor
        tv.layer.shadowOpacity = 0.1
        tv.layer.shadowOffset = CGSize(width: 0, height: 4)
        tv.layer.shadowRadius = 12
        tv.isHidden = true
        tv.translatesAutoresizingMaskIntoConstraints = false
        return tv
    }()

    private let options = ["San Francisco", "New York", "London", "Tokyo"]
    private var selectedOption: String?
    private var isOpen = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(button)
        addSubview(tableView)

        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")

        button.addTarget(self, action: #selector(toggleDropdown), for: .touchUpInside)

        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: topAnchor),
            button.leadingAnchor.constraint(equalTo: leadingAnchor),
            button.trailingAnchor.constraint(equalTo: trailingAnchor),
            button.widthAnchor.constraint(equalToConstant: 260),
            button.heightAnchor.constraint(equalToConstant: 44),

            tableView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 6),
            tableView.leadingAnchor.constraint(equalTo: leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: trailingAnchor),
            tableView.heightAnchor.constraint(equalToConstant: 176),
            tableView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    @objc private func toggleDropdown() {
        isOpen.toggle()
        UIView.animate(withDuration: 0.25, delay: 0, options: .curveEaseInOut) {
            self.tableView.isHidden = !self.isOpen
            self.tableView.alpha = self.isOpen ? 1 : 0
        }
    }
}

extension DropdownView: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        options.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let option = options[indexPath.row]
        cell.textLabel?.text = option
        cell.textLabel?.font = .systemFont(ofSize: 15)
        cell.accessoryType = option == selectedOption ? .checkmark : .none
        cell.tintColor = .systemBlue
        return cell
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        selectedOption = options[indexPath.row]
        var config = button.configuration ?? UIButton.Configuration.plain()
        config.title = selectedOption
        button.configuration = config
        tableView.reloadData()
        toggleDropdown()
    }
}

// MARK: - Usage
// let dropdown = DropdownView()
// view.addSubview(dropdown)
// dropdown.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     dropdown.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     dropdown.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
  {
    title: "Menu Dropdown",
    description: "Action menu with icons, similar to iOS context menus.",
    preview: <MenuDropdownPreview />,
    swiftCode: `import UIKit

class MenuDropdownView: UIView {

    private lazy var menuButton: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.filled()
        config.title = "Actions"
        config.image = UIImage(systemName: "chevron.down")
        config.imagePlacement = .trailing
        config.imagePadding = 6
        config.cornerStyle = .large
        config.baseBackgroundColor = .secondarySystemBackground
        config.baseForegroundColor = .label

        button.configuration = config
        button.translatesAutoresizingMaskIntoConstraints = false
        button.showsMenuAsPrimaryAction = true
        button.menu = createMenu()
        return button
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func createMenu() -> UIMenu {
        let edit = UIAction(
            title: "Edit",
            image: UIImage(systemName: "pencil")
        ) { _ in }

        let duplicate = UIAction(
            title: "Duplicate",
            image: UIImage(systemName: "doc.on.doc")
        ) { _ in }

        let share = UIAction(
            title: "Share",
            image: UIImage(systemName: "square.and.arrow.up")
        ) { _ in }

        let delete = UIAction(
            title: "Delete",
            image: UIImage(systemName: "trash"),
            attributes: .destructive
        ) { _ in }

        return UIMenu(children: [edit, duplicate, share, delete])
    }

    private func setupView() {
        addSubview(menuButton)

        NSLayoutConstraint.activate([
            menuButton.topAnchor.constraint(equalTo: topAnchor),
            menuButton.leadingAnchor.constraint(equalTo: leadingAnchor),
            menuButton.bottomAnchor.constraint(equalTo: bottomAnchor),
            menuButton.heightAnchor.constraint(equalToConstant: 44),
        ])
    }
}

// MARK: - Usage
// let menuDropdown = MenuDropdownView()
// view.addSubview(menuDropdown)
// menuDropdown.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     menuDropdown.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     menuDropdown.centerYAnchor.constraint(equalTo: view.centerYAnchor),
// ])
`,
  },
  {
    title: "Grouped Dropdown",
    description: "Dropdown with categorized sections and headers.",
    preview: <GroupedDropdownPreview />,
    swiftCode: `import UIKit

class GroupedDropdownView: UIView {

    struct Section {
        let title: String
        let items: [String]
    }

    private let button: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.plain()
        config.title = "Choose a fruit"
        config.baseForegroundColor = .label
        config.image = UIImage(systemName: "chevron.down")
        config.imagePlacement = .trailing
        config.imagePadding = 8
        config.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 16, bottom: 10, trailing: 16)
        button.configuration = config
        button.layer.cornerRadius = 12
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor.separator.cgColor
        button.backgroundColor = .systemBackground
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let tableView: UITableView = {
        let tv = UITableView(frame: .zero, style: .grouped)
        tv.layer.cornerRadius = 12
        tv.layer.borderWidth = 1
        tv.layer.borderColor = UIColor.separator.cgColor
        tv.layer.shadowColor = UIColor.black.cgColor
        tv.layer.shadowOpacity = 0.1
        tv.layer.shadowOffset = CGSize(width: 0, height: 4)
        tv.layer.shadowRadius = 12
        tv.clipsToBounds = false
        tv.isHidden = true
        tv.translatesAutoresizingMaskIntoConstraints = false
        return tv
    }()

    private let sections: [Section] = [
        Section(title: "Citrus", items: ["Orange", "Lemon", "Grapefruit"]),
        Section(title: "Berry", items: ["Strawberry", "Blueberry", "Raspberry"]),
    ]

    private var selectedItem: String?
    private var isOpen = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(button)
        addSubview(tableView)

        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")

        button.addTarget(self, action: #selector(toggleDropdown), for: .touchUpInside)

        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: topAnchor),
            button.leadingAnchor.constraint(equalTo: leadingAnchor),
            button.trailingAnchor.constraint(equalTo: trailingAnchor),
            button.widthAnchor.constraint(equalToConstant: 260),
            button.heightAnchor.constraint(equalToConstant: 44),

            tableView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 6),
            tableView.leadingAnchor.constraint(equalTo: leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: trailingAnchor),
            tableView.heightAnchor.constraint(equalToConstant: 260),
            tableView.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    @objc private func toggleDropdown() {
        isOpen.toggle()
        UIView.animate(withDuration: 0.25, delay: 0, options: .curveEaseInOut) {
            self.tableView.isHidden = !self.isOpen
            self.tableView.alpha = self.isOpen ? 1 : 0
        }
    }
}

extension GroupedDropdownView: UITableViewDataSource, UITableViewDelegate {
    func numberOfSections(in tableView: UITableView) -> Int {
        sections.count
    }

    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        sections[section].title
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        sections[section].items.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let item = sections[indexPath.section].items[indexPath.row]
        cell.textLabel?.text = item
        cell.textLabel?.font = .systemFont(ofSize: 15)
        cell.accessoryType = item == selectedItem ? .checkmark : .none
        cell.tintColor = .systemBlue
        return cell
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        selectedItem = sections[indexPath.section].items[indexPath.row]
        var config = button.configuration ?? UIButton.Configuration.plain()
        config.title = selectedItem
        button.configuration = config
        tableView.reloadData()
        toggleDropdown()
    }
}

// MARK: - Usage
// let grouped = GroupedDropdownView()
// view.addSubview(grouped)
// grouped.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     grouped.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     grouped.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
  {
    title: "Searchable Dropdown",
    description: "Dropdown with built-in search field for filtering options.",
    preview: <SearchableDropdownPreview />,
    swiftCode: `import UIKit

class SearchableDropdownView: UIView {

    private let button: UIButton = {
        let button = UIButton(type: .system)
        var config = UIButton.Configuration.plain()
        config.title = "Select a country"
        config.baseForegroundColor = .label
        config.image = UIImage(systemName: "chevron.down")
        config.imagePlacement = .trailing
        config.imagePadding = 8
        config.contentInsets = NSDirectionalEdgeInsets(top: 10, leading: 16, bottom: 10, trailing: 16)
        button.configuration = config
        button.layer.cornerRadius = 12
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor.separator.cgColor
        button.backgroundColor = .systemBackground
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()

    private let containerView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.separator.cgColor
        view.layer.shadowColor = UIColor.black.cgColor
        view.layer.shadowOpacity = 0.1
        view.layer.shadowOffset = CGSize(width: 0, height: 4)
        view.layer.shadowRadius = 12
        view.backgroundColor = .systemBackground
        view.clipsToBounds = false
        view.isHidden = true
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()

    private let searchBar: UISearchBar = {
        let sb = UISearchBar()
        sb.placeholder = "Search..."
        sb.searchBarStyle = .minimal
        sb.translatesAutoresizingMaskIntoConstraints = false
        return sb
    }()

    private let tableView: UITableView = {
        let tv = UITableView()
        tv.translatesAutoresizingMaskIntoConstraints = false
        return tv
    }()

    private let allCountries = [
        "United States", "United Kingdom", "Canada",
        "Australia", "Germany", "France", "Japan", "South Korea"
    ]
    private var filteredCountries: [String] = []
    private var selectedCountry: String?
    private var isOpen = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        filteredCountries = allCountries
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        filteredCountries = allCountries
        setupView()
    }

    private func setupView() {
        addSubview(button)
        addSubview(containerView)
        containerView.addSubview(searchBar)
        containerView.addSubview(tableView)

        searchBar.delegate = self
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")

        button.addTarget(self, action: #selector(toggleDropdown), for: .touchUpInside)

        NSLayoutConstraint.activate([
            button.topAnchor.constraint(equalTo: topAnchor),
            button.leadingAnchor.constraint(equalTo: leadingAnchor),
            button.trailingAnchor.constraint(equalTo: trailingAnchor),
            button.widthAnchor.constraint(equalToConstant: 260),
            button.heightAnchor.constraint(equalToConstant: 44),

            containerView.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 6),
            containerView.leadingAnchor.constraint(equalTo: leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: trailingAnchor),
            containerView.heightAnchor.constraint(equalToConstant: 240),
            containerView.bottomAnchor.constraint(equalTo: bottomAnchor),

            searchBar.topAnchor.constraint(equalTo: containerView.topAnchor),
            searchBar.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            searchBar.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),

            tableView.topAnchor.constraint(equalTo: searchBar.bottomAnchor),
            tableView.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
        ])
    }

    @objc private func toggleDropdown() {
        isOpen.toggle()
        if isOpen {
            filteredCountries = allCountries
            searchBar.text = ""
            tableView.reloadData()
        }
        UIView.animate(withDuration: 0.25, delay: 0, options: .curveEaseInOut) {
            self.containerView.isHidden = !self.isOpen
            self.containerView.alpha = self.isOpen ? 1 : 0
        }
    }
}

extension SearchableDropdownView: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        filteredCountries = searchText.isEmpty
            ? allCountries
            : allCountries.filter { $0.localizedCaseInsensitiveContains(searchText) }
        tableView.reloadData()
    }
}

extension SearchableDropdownView: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        filteredCountries.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let country = filteredCountries[indexPath.row]
        cell.textLabel?.text = country
        cell.textLabel?.font = .systemFont(ofSize: 15)
        cell.accessoryType = country == selectedCountry ? .checkmark : .none
        cell.tintColor = .systemBlue
        return cell
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        selectedCountry = filteredCountries[indexPath.row]
        var config = button.configuration ?? UIButton.Configuration.plain()
        config.title = selectedCountry
        button.configuration = config
        tableView.reloadData()
        toggleDropdown()
    }
}

// MARK: - Usage
// let searchable = SearchableDropdownView()
// view.addSubview(searchable)
// searchable.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     searchable.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     searchable.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
// ])
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export default function Dropdown() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dropdown</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style dropdown menus with selection, search, and grouped options.
        </p>
      </div>
      <div className="space-y-4">
        {dropdownStyles.map((style) => (
          <CodePreview
            key={style.title}
            title={style.title}
            description={style.description}
            preview={style.preview}
            swiftCode={style.swiftCode}
          />
        ))}
      </div>
    </div>
  );
}
