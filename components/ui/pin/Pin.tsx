"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CodePreview from "@/components/ui/CodePreview";

// ─── Style 1: Classic Dots ───────────────────────────────────────────────────
function ClassicDotsPreview() {
  const [pin, setPin] = useState("");
  const maxLen = 4;

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Enter PIN
      </p>
      <div className="flex gap-4">
        {Array.from({ length: maxLen }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              pin.length > i
                ? { scale: [1, 1.3, 1], backgroundColor: "#3b82f6" }
                : { scale: 1, backgroundColor: "#e5e7eb" }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-4 w-4 rounded-full dark:bg-neutral-700"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <button
              key={idx}
              disabled={key === ""}
              onClick={() => {
                if (key === "⌫") {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < maxLen) {
                  setPin((p) => p + key);
                }
              }}
              className={`h-14 w-14 rounded-full text-lg font-semibold transition-colors ${
                key === ""
                  ? "pointer-events-none"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white active:bg-neutral-200 dark:active:bg-neutral-700"
              }`}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Style 2: Filled Boxes ───────────────────────────────────────────────────
function FilledBoxesPreview() {
  const [pin, setPin] = useState("");
  const maxLen = 4;
  const filled = pin.length === maxLen;

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Passcode
      </p>
      <div className="flex gap-3">
        {Array.from({ length: maxLen }).map((_, i) => {
          const isActive = i === pin.length;
          const isFilled = i < pin.length;
          return (
            <motion.div
              key={i}
              animate={
                isFilled
                  ? { scale: [1, 0.85, 1], borderColor: "#3b82f6" }
                  : isActive
                  ? { borderColor: "#3b82f6", scale: 1 }
                  : { borderColor: "#d1d5db", scale: 1 }
              }
              transition={{ duration: 0.2 }}
              className="relative h-14 w-12 rounded-xl border-2 flex items-center justify-center bg-white dark:bg-neutral-900"
            >
              <AnimatePresence>
                {isFilled && (
                  <motion.span
                    key="digit"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15, ease: "backOut" }}
                    className="text-xl font-bold text-blue-500"
                  >
                    •
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute h-6 w-0.5 bg-blue-500 rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <button
              key={idx}
              disabled={key === ""}
              onClick={() => {
                if (key === "⌫") {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < maxLen) {
                  setPin((p) => p + key);
                }
              }}
              className={`h-14 w-14 rounded-2xl text-lg font-semibold transition-all ${
                key === ""
                  ? "pointer-events-none"
                  : filled
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white active:scale-95"
              }`}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Style 3: Underline / Minimal ────────────────────────────────────────────
function UnderlinePreview() {
  const [pin, setPin] = useState("");
  const maxLen = 6;

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Verification Code
      </p>
      <div className="flex gap-3">
        {Array.from({ length: maxLen }).map((_, i) => {
          const isFilled = i < pin.length;
          const isActive = i === pin.length;
          return (
            <div key={i} className="flex flex-col items-center gap-1 w-9">
              <AnimatePresence mode="wait">
                {isFilled ? (
                  <motion.span
                    key="char"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-xl font-bold text-neutral-900 dark:text-white h-8 flex items-center"
                  >
                    •
                  </motion.span>
                ) : (
                  <div key="empty" className="h-8" />
                )}
              </AnimatePresence>
              <motion.div
                animate={{
                  scaleX: isFilled || isActive ? 1 : 0.6,
                  backgroundColor:
                    isFilled
                      ? "#3b82f6"
                      : isActive
                      ? "#6b7280"
                      : "#d1d5db",
                }}
                transition={{ duration: 0.2 }}
                className="h-0.5 w-full rounded-full origin-left"
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <button
              key={idx}
              disabled={key === ""}
              onClick={() => {
                if (key === "⌫") {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < maxLen) {
                  setPin((p) => p + key);
                }
              }}
              className={`h-14 w-14 rounded-full text-lg font-medium transition-colors ${
                key === ""
                  ? "pointer-events-none"
                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700"
              }`}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Style 4: Shake on Error ─────────────────────────────────────────────────
function ShakeErrorPreview() {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const correctPin = "1234";
  const maxLen = 4;

  const handleKey = (key: string) => {
    if (key === "⌫") {
      setPin((p) => p.slice(0, -1));
      return;
    }
    const next = pin + key;
    if (next.length <= maxLen) {
      setPin(next);
      if (next.length === maxLen && next !== correctPin) {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin("");
        }, 600);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Try PIN: 1234
      </p>
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex gap-4"
      >
        {Array.from({ length: maxLen }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              shake
                ? { backgroundColor: "#ef4444", scale: 1 }
                : pin.length > i
                ? { backgroundColor: "#22c55e", scale: [1, 1.2, 1] }
                : { backgroundColor: "#e5e7eb", scale: 1 }
            }
            transition={{ duration: 0.2 }}
            className="h-4 w-4 rounded-full"
          />
        ))}
      </motion.div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <button
              key={idx}
              disabled={key === "" || shake}
              onClick={() => handleKey(key)}
              className={`h-14 w-14 rounded-full text-lg font-semibold transition-colors ${
                key === ""
                  ? "pointer-events-none"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white active:bg-neutral-200 dark:active:bg-neutral-700 disabled:opacity-40"
              }`}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Style 5: Glass Morphism ──────────────────────────────────────────────────
function GlassPreview() {
  const [pin, setPin] = useState("");
  const maxLen = 4;

  return (
    <div
      className="relative flex flex-col items-center gap-8 w-full py-4"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        borderRadius: 24,
        padding: "28px 0",
      }}
    >
      <p className="text-sm text-white/80 font-medium tracking-widest uppercase">
        Enter Passcode
      </p>
      <div className="flex gap-4">
        {Array.from({ length: maxLen }).map((_, i) => (
          <motion.div
            key={i}
            animate={
              pin.length > i
                ? {
                    scale: [1, 1.25, 1],
                    backgroundColor: "rgba(255,255,255,0.95)",
                  }
                : {
                    scale: 1,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }
            }
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="h-4 w-4 rounded-full border border-white/40"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 px-8">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <button
              key={idx}
              disabled={key === ""}
              onClick={() => {
                if (key === "⌫") {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < maxLen) {
                  setPin((p) => p + key);
                }
              }}
              className={`h-14 w-14 rounded-full text-lg font-semibold text-white transition-all ${
                key === ""
                  ? "pointer-events-none"
                  : "bg-white/20 backdrop-blur-md border border-white/30 active:bg-white/40 active:scale-95"
              }`}
            >
              {key}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Style 6: Bounce Reveal ───────────────────────────────────────────────────
function BounceRevealPreview() {
  const [pin, setPin] = useState<string[]>([]);
  const maxLen = 4;

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Bounce PIN
      </p>
      <div className="flex gap-3">
        {Array.from({ length: maxLen }).map((_, i) => {
          const isFilled = i < pin.length;
          return (
            <div
              key={i}
              className="relative h-14 w-12 flex items-center justify-center"
            >
              <AnimatePresence>
                {isFilled ? (
                  <motion.div
                    key={`filled-${i}`}
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 15 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 22,
                    }}
                    className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-300 dark:shadow-violet-900"
                  >
                    <span className="text-white text-xl font-bold">•</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`empty-${i}`}
                    className="h-12 w-12 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700"
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
          (key, idx) => (
            <motion.button
              key={idx}
              disabled={key === ""}
              whileTap={key !== "" ? { scale: 0.9 } : undefined}
              onClick={() => {
                if (key === "⌫") {
                  setPin((p) => p.slice(0, -1));
                } else if (pin.length < maxLen) {
                  setPin((p) => [...p, key]);
                }
              }}
              className={`h-14 w-14 rounded-2xl text-lg font-semibold transition-colors ${
                key === ""
                  ? "pointer-events-none"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              }`}
            >
              {key}
            </motion.button>
          )
        )}
      </div>
    </div>
  );
}

// ─── Swift Code Snippets ──────────────────────────────────────────────────────

const classicDotsSwift = `import UIKit

class ClassicDotsPINView: UIView {

    private let dotCount: Int
    private var enteredDigits: [String] = []

    private let dotsStack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 16
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var dotViews: [UIView] = []

    init(digits: Int = 4) {
        self.dotCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.dotCount = 4
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(dotsStack)
        NSLayoutConstraint.activate([
            dotsStack.centerXAnchor.constraint(equalTo: centerXAnchor),
            dotsStack.topAnchor.constraint(equalTo: topAnchor),
            dotsStack.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])

        for _ in 0..<dotCount {
            let dot = UIView()
            dot.layer.cornerRadius = 8
            dot.backgroundColor = .systemGray5
            dot.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                dot.widthAnchor.constraint(equalToConstant: 16),
                dot.heightAnchor.constraint(equalToConstant: 16),
            ])
            dotViews.append(dot)
            dotsStack.addArrangedSubview(dot)
        }
    }

    func appendDigit(_ digit: String) {
        guard enteredDigits.count < dotCount else { return }
        enteredDigits.append(digit)
        updateDots()
    }

    func deleteLastDigit() {
        guard !enteredDigits.isEmpty else { return }
        enteredDigits.removeLast()
        updateDots()
    }

    private func updateDots() {
        for (index, dot) in dotViews.enumerated() {
            let isFilled = index < enteredDigits.count
            UIView.animate(withDuration: 0.15, delay: 0,
                           usingSpringWithDamping: 0.6,
                           initialSpringVelocity: 0.8) {
                dot.backgroundColor = isFilled ? .systemBlue : .systemGray5
                dot.transform = isFilled
                    ? CGAffineTransform(scaleX: 1.3, y: 1.3)
                    : .identity
            } completion: { _ in
                UIView.animate(withDuration: 0.1) {
                    dot.transform = .identity
                }
            }
        }
    }

    var code: String { enteredDigits.joined() }
}

// MARK: - Usage
// let pinView = ClassicDotsPINView(digits: 4)
// view.addSubview(pinView)
// pinView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     pinView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     pinView.topAnchor.constraint(equalTo: keypadView.topAnchor, constant: -60),
// ])
`;

const filledBoxesSwift = `import UIKit

class FilledBoxesPINView: UIView {

    private let boxCount: Int
    private var enteredDigits: [String] = []

    private let stack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 10
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var boxes: [UIView] = []
    private var cursors: [UIView] = []

    init(digits: Int = 4) {
        self.boxCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.boxCount = 4
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stack)
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor),
            stack.centerXAnchor.constraint(equalTo: centerXAnchor),
        ])

        for i in 0..<boxCount {
            let box = UIView()
            box.layer.cornerRadius = 12
            box.layer.borderWidth = 2
            box.layer.borderColor = UIColor.systemGray4.cgColor
            box.backgroundColor = .systemBackground
            box.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                box.widthAnchor.constraint(equalToConstant: 48),
                box.heightAnchor.constraint(equalToConstant: 56),
            ])

            // Dot inside box
            let dot = UIView()
            dot.layer.cornerRadius = 6
            dot.backgroundColor = .systemBlue
            dot.alpha = 0
            dot.translatesAutoresizingMaskIntoConstraints = false
            box.addSubview(dot)
            NSLayoutConstraint.activate([
                dot.widthAnchor.constraint(equalToConstant: 12),
                dot.heightAnchor.constraint(equalToConstant: 12),
                dot.centerXAnchor.constraint(equalTo: box.centerXAnchor),
                dot.centerYAnchor.constraint(equalTo: box.centerYAnchor),
            ])

            // Blinking cursor
            let cursor = UIView()
            cursor.layer.cornerRadius = 1
            cursor.backgroundColor = .systemBlue
            cursor.translatesAutoresizingMaskIntoConstraints = false
            box.addSubview(cursor)
            NSLayoutConstraint.activate([
                cursor.widthAnchor.constraint(equalToConstant: 2),
                cursor.heightAnchor.constraint(equalToConstant: 22),
                cursor.centerXAnchor.constraint(equalTo: box.centerXAnchor),
                cursor.centerYAnchor.constraint(equalTo: box.centerYAnchor),
            ])
            cursor.alpha = i == 0 ? 1 : 0
            animateCursor(cursor)

            boxes.append(dot.superview!)
            cursors.append(cursor)
            stack.addArrangedSubview(box)
        }
    }

    private func animateCursor(_ view: UIView) {
        UIView.animate(withDuration: 0.6, delay: 0,
                       options: [.repeat, .autoreverse]) {
            view.alpha = 0
        }
    }

    func appendDigit(_ digit: String) {
        guard enteredDigits.count < boxCount else { return }
        let idx = enteredDigits.count
        enteredDigits.append(digit)

        let box = stack.arrangedSubviews[idx]
        let dot = box.subviews.first { $0.layer.cornerRadius == 6 }
        let cursor = cursors[idx]

        UIView.animate(withDuration: 0.15,
                       usingSpringWithDamping: 0.6,
                       initialSpringVelocity: 0.8) {
            dot?.alpha = 1
            dot?.transform = CGAffineTransform(scaleX: 1.3, y: 1.3)
            box.layer.borderColor = UIColor.systemBlue.cgColor
            cursor.alpha = 0
            cursor.layer.removeAllAnimations()
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                dot?.transform = .identity
            }
        }

        // Move cursor to next box
        if idx + 1 < boxCount {
            let nextBox = stack.arrangedSubviews[idx + 1]
            let nextCursor = cursors[idx + 1]
            nextBox.layer.borderColor = UIColor.systemBlue.cgColor
            nextCursor.alpha = 1
            self.animateCursor(nextCursor)
        }
    }

    func deleteLastDigit() {
        guard !enteredDigits.isEmpty else { return }
        enteredDigits.removeLast()
        let idx = enteredDigits.count
        let box = stack.arrangedSubviews[idx]
        let dot = box.subviews.first { $0.layer.cornerRadius == 6 }
        let cursor = cursors[idx]

        UIView.animate(withDuration: 0.12) {
            dot?.alpha = 0
            dot?.transform = CGAffineTransform(scaleX: 0.5, y: 0.5)
        } completion: { _ in
            dot?.transform = .identity
        }

        cursor.alpha = 1
        animateCursor(cursor)
        box.layer.borderColor = UIColor.systemBlue.cgColor

        if idx > 0 {
            let prevBox = stack.arrangedSubviews[idx - 1] as? UIView
            let prevCursor = cursors[idx - 1]
            prevCursor.alpha = 0
            prevCursor.layer.removeAllAnimations()
            prevBox?.layer.borderColor = UIColor.systemBlue.cgColor
        }
    }

    var code: String { enteredDigits.joined() }
}

// MARK: - Usage
// let pinView = FilledBoxesPINView(digits: 4)
// view.addSubview(pinView)
// pinView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     pinView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     pinView.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -120),
// ])
`;

const underlineSwift = `import UIKit

class UnderlinePINView: UIView {

    private let digitCount: Int
    private var entered: [String] = []

    private let stack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 12
        sv.alignment = .bottom
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var underlines: [UIView] = []
    private var labels: [UILabel] = []

    init(digits: Int = 6) {
        self.digitCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.digitCount = 6
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stack)
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor),
            stack.centerXAnchor.constraint(equalTo: centerXAnchor),
        ])

        for i in 0..<digitCount {
            let col = UIStackView()
            col.axis = .vertical
            col.alignment = .center
            col.spacing = 4

            let label = UILabel()
            label.font = .systemFont(ofSize: 22, weight: .bold)
            label.textColor = .label
            label.text = " "
            label.textAlignment = .center
            labels.append(label)

            let line = UIView()
            line.backgroundColor = i == 0 ? .systemGray2 : .systemGray5
            line.layer.cornerRadius = 1
            line.translatesAutoresizingMaskIntoConstraints = false
            underlines.append(line)

            col.addArrangedSubview(label)
            col.addArrangedSubview(line)

            NSLayoutConstraint.activate([
                col.widthAnchor.constraint(equalToConstant: 36),
                line.heightAnchor.constraint(equalToConstant: 2),
                line.widthAnchor.constraint(equalTo: col.widthAnchor),
            ])
            stack.addArrangedSubview(col)
        }
    }

    func appendDigit(_ digit: String) {
        guard entered.count < digitCount else { return }
        let idx = entered.count
        entered.append(digit)

        labels[idx].text = "•"
        UIView.animate(withDuration: 0.2) {
            self.underlines[idx].backgroundColor = .systemBlue
            self.underlines[idx].transform = CGAffineTransform(scaleX: 1, y: 2)
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                self.underlines[idx].transform = .identity
            }
        }

        if idx + 1 < digitCount {
            underlines[idx + 1].backgroundColor = .systemGray2
        }
    }

    func deleteLastDigit() {
        guard !entered.isEmpty else { return }
        entered.removeLast()
        let idx = entered.count
        labels[idx].text = " "
        UIView.animate(withDuration: 0.15) {
            self.underlines[idx].backgroundColor = .systemGray2
        }
        if idx > 0 {
            underlines[idx - 1].backgroundColor = .systemBlue
        }
    }

    var code: String { entered.joined() }
}

// MARK: - Usage
// let pinView = UnderlinePINView(digits: 6)
// view.addSubview(pinView)
// pinView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     pinView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     pinView.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -100),
// ])
`;

const shakeSwift = `import UIKit

class ShakeErrorPINView: UIView {

    private let dotCount: Int
    private var enteredDigits: [String] = []

    private let dotsStack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 16
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var dotViews: [UIView] = []
    var onComplete: ((String) -> Void)?

    init(digits: Int = 4) {
        self.dotCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.dotCount = 4
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(dotsStack)
        NSLayoutConstraint.activate([
            dotsStack.centerXAnchor.constraint(equalTo: centerXAnchor),
            dotsStack.topAnchor.constraint(equalTo: topAnchor),
            dotsStack.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
        for _ in 0..<dotCount {
            let dot = UIView()
            dot.layer.cornerRadius = 8
            dot.backgroundColor = .systemGray5
            dot.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                dot.widthAnchor.constraint(equalToConstant: 16),
                dot.heightAnchor.constraint(equalToConstant: 16),
            ])
            dotViews.append(dot)
            dotsStack.addArrangedSubview(dot)
        }
    }

    func appendDigit(_ digit: String) {
        guard enteredDigits.count < dotCount else { return }
        enteredDigits.append(digit)

        let idx = enteredDigits.count - 1
        UIView.animate(withDuration: 0.15,
                       usingSpringWithDamping: 0.5,
                       initialSpringVelocity: 1.0) {
            self.dotViews[idx].backgroundColor = .systemGreen
            self.dotViews[idx].transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                self.dotViews[idx].transform = .identity
            }
        }

        if enteredDigits.count == self.dotCount {
            onComplete?(enteredDigits.joined())
        }
    }

    func triggerError() {
        // Turn all red
        dotViews.forEach { $0.backgroundColor = .systemRed }

        // Shake animation
        let shake = CAKeyframeAnimation(keyPath: "position.x")
        shake.values = [0, -10, 10, -8, 8, -5, 5, 0].map {
            (dotsStack.layer.position.x + CGFloat($0))
        }
        shake.duration = 0.5
        shake.timingFunction = CAMediaTimingFunction(name: .easeOut)
        dotsStack.layer.add(shake, forKey: "shake")

        // Reset after delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
            self.reset()
        }
    }

    func deleteLastDigit() {
        guard !enteredDigits.isEmpty else { return }
        enteredDigits.removeLast()
        let idx = enteredDigits.count
        UIView.animate(withDuration: 0.1) {
            self.dotViews[idx].backgroundColor = .systemGray5
            self.dotViews[idx].transform = CGAffineTransform(scaleX: 0.8, y: 0.8)
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                self.dotViews[idx].transform = .identity
            }
        }
    }

    func reset() {
        enteredDigits.removeAll()
        dotViews.forEach {
            UIView.animate(withDuration: 0.15) {
                $0.backgroundColor = .systemGray5
            }
        }
    }

    var code: String { enteredDigits.joined() }
}

// MARK: - Usage
// let pinView = ShakeErrorPINView(digits: 4)
// pinView.onComplete = { code in
//     if code == "1234" {
//         // success
//     } else {
//         pinView.triggerError()
//     }
// }
// view.addSubview(pinView)
// pinView.translatesAutoresizingMaskIntoConstraints = false
`;

const glassSwift = `import UIKit

class GlassPINView: UIView {

    private let dotCount: Int
    private var enteredDigits: [String] = []

    private let gradientLayer = CAGradientLayer()

    private let dotsStack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 16
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var dotViews: [UIView] = []

    init(digits: Int = 4) {
        self.dotCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.dotCount = 4
        super.init(coder: coder)
        setupView()
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        gradientLayer.frame = bounds
    }

    private func setupView() {
        layer.cornerRadius = 24
        clipsToBounds = true

        gradientLayer.colors = [
            UIColor(red: 0.40, green: 0.49, blue: 0.92, alpha: 1).cgColor,
            UIColor(red: 0.46, green: 0.29, blue: 0.64, alpha: 1).cgColor,
        ]
        gradientLayer.startPoint = CGPoint(x: 0, y: 0)
        gradientLayer.endPoint = CGPoint(x: 1, y: 1)
        layer.insertSublayer(gradientLayer, at: 0)

        addSubview(dotsStack)
        NSLayoutConstraint.activate([
            dotsStack.centerXAnchor.constraint(equalTo: centerXAnchor),
            dotsStack.centerYAnchor.constraint(equalTo: centerYAnchor),
        ])

        for _ in 0..<dotCount {
            let dot = UIView()
            dot.layer.cornerRadius = 8
            dot.backgroundColor = UIColor.white.withAlphaComponent(0.25)
            dot.layer.borderWidth = 1
            dot.layer.borderColor = UIColor.white.withAlphaComponent(0.4).cgColor
            dot.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                dot.widthAnchor.constraint(equalToConstant: 16),
                dot.heightAnchor.constraint(equalToConstant: 16),
            ])
            dotViews.append(dot)
            dotsStack.addArrangedSubview(dot)
        }
    }

    func appendDigit(_ digit: String) {
        guard enteredDigits.count < dotCount else { return }
        enteredDigits.append(digit)
        let idx = enteredDigits.count - 1
        UIView.animate(withDuration: 0.2,
                       usingSpringWithDamping: 0.6,
                       initialSpringVelocity: 0.8) {
            self.dotViews[idx].backgroundColor = UIColor.white.withAlphaComponent(0.95)
            self.dotViews[idx].transform = CGAffineTransform(scaleX: 1.25, y: 1.25)
        } completion: { _ in
            UIView.animate(withDuration: 0.1) {
                self.dotViews[idx].transform = .identity
            }
        }
    }

    func deleteLastDigit() {
        guard !enteredDigits.isEmpty else { return }
        enteredDigits.removeLast()
        let idx = enteredDigits.count
        UIView.animate(withDuration: 0.15) {
            self.dotViews[idx].backgroundColor = UIColor.white.withAlphaComponent(0.25)
        }
    }

    var code: String { enteredDigits.joined() }
}

// MARK: - Usage
// let glassPin = GlassPINView(digits: 4)
// view.addSubview(glassPin)
// glassPin.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     glassPin.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     glassPin.widthAnchor.constraint(equalToConstant: 280),
//     glassPin.heightAnchor.constraint(equalToConstant: 200),
// ])
`;

const bounceSwift = `import UIKit

class BouncePINView: UIView {

    private let slotCount: Int
    private var enteredDigits: [String] = []

    private let stack: UIStackView = {
        let sv = UIStackView()
        sv.axis = .horizontal
        sv.spacing = 10
        sv.translatesAutoresizingMaskIntoConstraints = false
        return sv
    }()

    private var slotViews: [UIView] = []

    init(digits: Int = 4) {
        self.slotCount = digits
        super.init(frame: .zero)
        setupView()
    }

    required init?(coder: NSCoder) {
        self.slotCount = 4
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        addSubview(stack)
        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: topAnchor),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor),
            stack.centerXAnchor.constraint(equalTo: centerXAnchor),
        ])
        for _ in 0..<slotCount {
            let slot = UIView()
            slot.layer.cornerRadius = 12
            slot.layer.borderWidth = 2
            slot.layer.borderColor = UIColor.systemGray4.cgColor
            slot.layer.borderColor = UIColor(
                red: 0.68, green: 0.40, blue: 0.95, alpha: 0.4
            ).cgColor
            slot.backgroundColor = .clear
            slot.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                slot.widthAnchor.constraint(equalToConstant: 48),
                slot.heightAnchor.constraint(equalToConstant: 52),
            ])
            slotViews.append(slot)
            stack.addArrangedSubview(slot)
        }
    }

    func appendDigit(_ digit: String) {
        guard enteredDigits.count < slotCount else { return }
        enteredDigits.append(digit)
        let idx = enteredDigits.count - 1
        let slot = slotViews[idx]

        // Bounce fill
        slot.backgroundColor = UIColor(
            red: 0.55, green: 0.20, blue: 0.90, alpha: 1
        )
        slot.transform = CGAffineTransform(scaleX: 0.4, y: 0.4).rotated(by: -.pi / 8)
        UIView.animate(
            withDuration: 0.5,
            delay: 0,
            usingSpringWithDamping: 0.45,
            initialSpringVelocity: 0.8
        ) {
            slot.transform = .identity
        }
    }

    func deleteLastDigit() {
        guard !enteredDigits.isEmpty else { return }
        enteredDigits.removeLast()
        let idx = enteredDigits.count
        let slot = slotViews[idx]
        UIView.animate(withDuration: 0.15) {
            slot.transform = CGAffineTransform(scaleX: 0.6, y: 0.6)
            slot.backgroundColor = .clear
        } completion: { _ in
            slot.transform = .identity
        }
    }

    var code: String { enteredDigits.joined() }
}

// MARK: - Usage
// let pinView = BouncePINView(digits: 4)
// view.addSubview(pinView)
// pinView.translatesAutoresizingMaskIntoConstraints = false
// NSLayoutConstraint.activate([
//     pinView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
//     pinView.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -100),
// ])
`;

// ─── Styles Array ─────────────────────────────────────────────────────────────

const pinStyles = [
  {
    title: "Classic Dots PIN",
    description:
      "Standard iOS lock screen dots — scale + color on each tap.",
    preview: <ClassicDotsPreview />,
    swiftCode: classicDotsSwift,
  },
  {
    title: "Filled Boxes PIN",
    description:
      "Each digit slot is a rounded box with a blinking cursor and pop-in dot.",
    preview: <FilledBoxesPreview />,
    swiftCode: filledBoxesSwift,
  },
  {
    title: "Underline / Minimal PIN",
    description:
      "6-digit minimal style with an animated underline that highlights active slot.",
    preview: <UnderlinePreview />,
    swiftCode: underlineSwift,
  },
  {
    title: "Shake on Error PIN",
    description:
      "Dots turn red and the row shakes when the wrong PIN is entered. Try 1234.",
    preview: <ShakeErrorPreview />,
    swiftCode: shakeSwift,
  },
  {
    title: "Glass Morphism PIN",
    description:
      "Gradient background with frosted-glass dot indicators.",
    preview: <GlassPreview />,
    swiftCode: glassSwift,
  },
  {
    title: "Bounce Reveal PIN",
    description:
      "Each slot pops in with a spring bounce animation when filled.",
    preview: <BounceRevealPreview />,
    swiftCode: bounceSwift,
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Pin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">PIN Input</h2>
        <p className="text-neutral-500 mt-1">
          iOS-style PIN entry with multiple animated styles.
        </p>
      </div>
      <div className="space-y-4">
        {pinStyles.map((style) => (
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
