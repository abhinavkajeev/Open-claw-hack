"""Vision judge logic for the vibe-check skill.

This script is intentionally lightweight and can be integrated with any vision-capable LLM.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any, Dict, List


@dataclass
class Judgment:
    verdict: str
    score: int
    confidence: float
    reasons: List[str]
    tags: List[str]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "verdict": self.verdict,
            "score": self.score,
            "confidence": self.confidence,
            "reasons": self.reasons,
            "tags": self.tags,
        }


def _mock_analyze(image_url: str) -> Judgment:
    """Fallback deterministic analyzer for local development."""
    score = 78 if image_url else 45
    confidence = 0.72 if image_url else 0.51
    verdict = "approved" if score >= 70 and confidence >= 0.6 else "rejected"
    reasons = [
        "Composition aligns with target vibe." if verdict == "approved" else "Insufficient visual signal.",
        "Color palette appears coherent." if verdict == "approved" else "Style cues are inconsistent.",
    ]
    tags = ["clean", "modern"] if verdict == "approved" else ["unclear"]
    return Judgment(verdict=verdict, score=score, confidence=confidence, reasons=reasons, tags=tags)


def analyze_vibe(image_url: str, rubric: Dict[str, Any] | None = None) -> Dict[str, Any]:
    """Analyze an image and return the vibe-check output schema.

    Replace the fallback branch with an actual API call to your preferred vision LLM.
    """
    _ = rubric
    api_key = os.getenv("OPENAI_API_KEY", "")

    if not api_key:
        return _mock_analyze(image_url).to_dict()

    # Placeholder branch for future vision model integration.
    # Keep deterministic fallback for development and testing.
    return _mock_analyze(image_url).to_dict()


def main() -> None:
    payload_raw = os.getenv("VIBE_INPUT", "{}")
    payload = json.loads(payload_raw)
    image_url = payload.get("image_url", "")
    rubric = payload.get("rubric", {})

    result = analyze_vibe(image_url=image_url, rubric=rubric)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
